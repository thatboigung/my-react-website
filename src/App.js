import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import ConfessionsAndStories from './pages/ConfessionsAndStories';
import Leaks from './pages/Leaks';
import Linkups from './pages/Linkups';
import Chat from './pages/Chat';
import About from './pages/About';
import PostPage from './pages/PostPage';

function App() {
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
