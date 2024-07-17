import React from 'react';
import './PostPage.css';

const comments = [
  {
    id: 1,
    text: 'That\'s hilarious! 😂',
    date: '2024-07-01 14:35',
  },
  {
    id: 2,
    text: 'You should tell your friend the truth!',
    date: '2024-07-01 14:40',
  },
];

function PostPage() {
  return (
    <div className="post-page">
      <div className="post-container">
        <div className="post-content">
          <p>I once told my friend I was busy studying when I was actually watching a movie. Felt guilty afterward.</p>
          <span className="post-date">Posted on 2024-07-01 14:30</span>
        </div>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <span className="comment-date">{comment.date}</span>
          </div>
        ))}
      </div>
      <div className="comment-box">
        <textarea placeholder="Write a comment..."></textarea>
        <button>+</button>
      </div>
    </div>
  );
}

export default PostPage;
