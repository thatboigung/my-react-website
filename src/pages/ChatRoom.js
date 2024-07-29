import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ChatRoom.css';

function ChatRoom() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`http://localhost/witterverseBackend/getUserDetails.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setUserDetails(data.user);
      } else {
        console.error('Failed to load user details:', data.message);
      }
    };

    const fetchMessages = async () => {
      const response = await fetch(`http://localhost/witterverseBackend/getMessages.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error('Failed to load messages:', data.message);
      }
    };

    fetchUserDetails();
    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost/witterverseBackend/sendMessage.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: userId,
        receiverId: userId,
        message: newMessage,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setNewMessage('');
    } else {
      console.error('Failed to send message:', data.message);
    }
  };

  return (
    <div className="chat-room">
      <h2>Chat with {userDetails.name}</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender_id === userId ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="new-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
