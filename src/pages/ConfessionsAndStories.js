import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import './ConfessionsAndStories.css';
import { Link } from 'react-router-dom';

const samplePosts = [
  {
    id: 1,
    text: 'I once told my friend I was busy studying when I was actually watching a movie. Felt guilty afterward.',
    date: '2024-07-01 14:30',
  },
  {
    id: 2,
    text: 'I broke my mom\'s favorite vase and blamed it on the dog. Sorry, buddy.',
    date: '2024-07-02 09:15',
  },
  {
    id: 3,
    text: 'I secretly enjoy pineapple on pizza. Don\'t @ me.',
    date: '2024-07-03 16:45',
  },
  {
    id: 4,
    text: 'I have a crush on my best friend but I\'m too scared to tell them.',
    date: '2024-07-04 11:00',
  },
  {
    id: 5,
    text: 'I once sang in the shower so loudly that my neighbor complained. Sorry, not sorry.',
    date: '2024-07-05 18:20',
  },
];

function ConfessionsAndStories() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [showReactions, setShowReactions] = useState(null);
  const [reactions, setReactions] = useState({});

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length < 50 || e.target.value.length > 1000) {
      setError('Your post must be between 50 and 1000 characters.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length >= 50 && text.length <= 1000) {
      alert('Post submitted: ' + text); // Placeholder for actual post submission logic
      setText('');
    } else {
      setError('Your post must be between 50 and 1000 characters.');
    }
  };

  const toggleReactions = (postId) => {
    if (showReactions === postId) {
      setShowReactions(null);
    } else {
      setShowReactions(postId);
    }
  };

  const handleReaction = (postId, reaction) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: reaction,
    }));
  };

  const Post = ({ post }) => (
    <div key={post.id} className="post">
      <p>{post.text}</p>
      <div className="post-meta">
        <span>{post.date}</span>
        <div className="post-icons">
          <FaHeart
            onClick={() => toggleReactions(post.id)}
            className={reactions[post.id] === 'like' ? 'active' : ''}
          />
          <Link to={`/post/${post.id}`}>  <FaComment /></Link>
        
        </div>
      </div>
      {showReactions === post.id && (
        <div className="reactions-popup">
          <span onClick={() => handleReaction(post.id, 'like')} role="img" aria-label="like">👍</span>
          <span onClick={() => handleReaction(post.id, 'love')} role="img" aria-label="love">❤️</span>
          <span onClick={() => handleReaction(post.id, 'laugh')} role="img" aria-label="laugh">😂</span>
          <span onClick={() => handleReaction(post.id, 'surprise')} role="img" aria-label="surprise">😮</span>
          <span onClick={() => handleReaction(post.id, 'sad')} role="img" aria-label="sad">😢</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="confessions-and-stories">
      
      <form onSubmit={handleSubmit}>
        <h1>Confessions & Stories</h1>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Share your confession or story..."
          className='post-textarea'
        ></textarea>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={text.length < 50 || text.length > 1000}>
          Post
        </button>
      </form>
      <div className="posts">
        {samplePosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default ConfessionsAndStories;
