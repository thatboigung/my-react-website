  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import './ChatRoom.css';

  function ChatRoom() {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Fetch messages for the chatroom
      const fetchMessages = async () => {
        const response = await fetch(`http://localhost/witterverseBackend/getMessages.php?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error('Failed to load messages:', data.message);
        }
      };

      // Fetch user details for the chatroom
      const fetchUser = async () => {
        const response = await fetch(`http://localhost/witterverseBackend/getUser.php?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          console.error('Failed to load user:', data.message);
        }
      };

      fetchMessages();
      fetchUser();
    }, [userId]);

    const handleSendMessage = async () => {
      if (message.trim() !== '') {
        // Send the message to the backend
        const currentUserId = localStorage.getItem('userId');
        const response = await fetch('http://localhost/witterverseBackend/sendMessage.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromUserId: currentUserId,
            toUserId: userId,
            message,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setMessages([...messages, { fromUserId: currentUserId, message }]);
          setMessage('');
        } else {
          console.error('Failed to send message:', data.message);
        }
      }
    };

    return (
      <div className="chat-room">
        <h1>Chat with {user ? user.name : '...'}</h1>
        <div className="messages">
          <div>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.fromUserId === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
              <p>{msg.message}</p>
            </div>
          ))} 
          </div>
          
        </div>
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }

  export default ChatRoom;
