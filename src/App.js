import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import ConfessionsAndStories from './pages/ConfessionsAndStories';
import EncountersPage from './pages/EncountersPage';
import Linkups from './pages/Linkups';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import PostPage from './pages/PostPage';
import Auth from './components/Auth';
import EditProfile from './pages/edit_prifile';
import ChatRoom from './pages/ChatRoom'; // Import ChatRoom

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const getUser = async (userId) => {
        const response = await fetch(`http://localhost/witterverseBackend/getUser.php?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('userId');
          setUser(null);
        }
      };
      getUser(userId);
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <NavBar onLogout={handleLogout} />
            <div className="content">
              <Routes>
                <Route path="/" element={<ConfessionsAndStories />} />
                <Route path="/encounters" element={<EncountersPage />} />
                <Route path="/linkups" element={<Linkups />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:userId" element={<ChatRoom />} /> {/* Add ChatRoom route */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
