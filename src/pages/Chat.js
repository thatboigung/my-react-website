import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Link } from 'react-router-dom';

function Chat() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [mutualLikes, setMutualLikes] = useState([]);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost/witterverseBackend/getLikedUsers.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setLikedUsers(data.likedUsers);
      } else {
        console.error('Failed to load liked users:', data.message);
      }
    };

    const fetchMutualLikes = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost/witterverseBackend/getMutualLikes.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setMutualLikes(data.mutualLikes);
      } else {
        console.error('Failed to load mutual likes:', data.message);
      }
    };

    fetchLikedUsers();
    fetchMutualLikes();
  }, []);

  return (
    <div className="chat-page">
      <div className="container">
        <h1>Chat</h1>
        <div className="liked-users-section">
          <h2>People Who Liked You</h2>
          <div className="liked-users">
            {likedUsers.map((user) => (
              <div key={user.id} className="liked-user">
                <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt={user.name} className="liked-user-pic" />
              </div>
            ))}
          </div>
        </div>
        <div className="mutual-likes-section">
          <h2>Mutual Likes</h2>
          <div className="mutual-likes">
            {mutualLikes.map((user) => (
              <Link to={`/chat/${user.id}`} key={user.id} className="mutual-like">
                <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt={user.name} className="mutual-like-pic" />
                <p>{user.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
