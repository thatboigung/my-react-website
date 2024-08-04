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
        <div className="liked-users-section">
          <h3>Likes</h3>
          <div className="liked-users">
            {likedUsers.map((user) => (
              <div key={user.id} className="">
                <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt={user.name} className="liked-user-pic" />
              </div>
            ))}
          </div>
        </div>
        <div className="mutual-likes-section">
          <h2>Chat</h2>
          <div className="mutual-likes">
            {mutualLikes.map((user) => (
              <Link to={`/chat/${user.id}`} key={user.id} className="mutual-like">
                <div className='mutual-like-user'>
                 <div>
                  <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt={user.name} className="mutual-like-pic" />
                </div>
                <div> <h3>{user.name}</h3>
                  <p>Chat with Taps</p>
                </div> 
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
