import React, { useState, useEffect } from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { postId } = useParams(); // Get the postId from URL params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the post details
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost/witterverseBackend/getPost.php?postId=${postId}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.post);
          setComments(data.comments);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('An error occurred while fetching the post.');
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await fetch('http://localhost/witterverseBackend/addComment.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, text: newComment }),
        });
        const data = await response.json();
        if (data.success) {
          setComments((prevComments) => [...prevComments, { id: data.commentId, text: newComment, date: new Date().toISOString() }]);
          setNewComment('');
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        setError('An error occurred while adding the comment.');
      }
    } else {
      setError('Comment cannot be empty.');
    }
  };

  return (
    <div className="post-page">
      {error && <p className="error">{error}</p>}
      {post ? (
        <div className="post-container">
          <div className="post-content">
            <p>{post.text}</p>
            <span className="post-date">Posted on {new Date(post.date).toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
      <div className="comments">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className="comment-box">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        ></textarea>
        <button onClick={handleCommentSubmit}>+</button>
      </div>
    </div>
  );
}

export default PostPage;
