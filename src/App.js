import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import ConfessionsAndStories from './pages/ConfessionsAndStories';
import Leaks from './pages/Leaks';
import Linkups from './pages/Linkups';
import Chat from './pages/Chat';
import About from './pages/About';
import PostPage from './pages/PostPage';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (!user) {
    return (
      <Router>
        <div className="App">
          <Auth onLogin={handleLogin} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ConfessionsAndStories />} />
            <Route path="/leaks" element={<Leaks />} />
            <Route path="/linkups" element={<Linkups />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
