import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import './ConfessionsAndStories.css';
import { Link } from 'react-router-dom';

function ConfessionsAndStories() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const observer = useRef();

  useEffect(() => {
    fetchUser();
    getLocation();
    loadPosts(1);
  }, []);

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost/witterverseBackend/getUser.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
          .then(response => response.json())
          .then(data => setCity(data.city));
      });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length < 50 || e.target.value.length > 1000) {
      setError('Your post must be between 50 and 1000 characters.');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length >= 50 && text.length <= 1000 && city && latitude && longitude) {
      setIsSubmitting(true);
      const tempPost = {
        id: 'temp',
        text,
        date: new Date().toISOString(),
        city,
        isPosting: true,
      };
      setPosts([tempPost, ...posts]);

      try {
        const response = await fetch('http://localhost/witterverseBackend/addPost.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id, text, city, latitude, longitude }),
        });
        const data = await response.json();
        if (data.success) {
          loadPosts(1); // Reload posts to get the new post from server
          setPopupMessage('Post added successfully');
          setTimeout(() => setPopupMessage(''), 3000);
        } else {
          setPosts(posts.filter(post => post.id !== 'temp'));
          setError(data.message);
        }
      } catch (error) {
        console.error('Failed to post:', error);
        setPosts(posts.filter(post => post.id !== 'temp'));
        setError('An error occurred during posting.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('Your post must be between 50 and 1000 characters and location must be available.');
    }
  };

  const loadPosts = async (page) => {
    setLoading(true);
    setError(''); // Clear any previous error
    try {
        const response = await fetch(`http://localhost/witterverseBackend/getPosts.php?page=${page}`);
        const data = await response.json();
        if (data.success) {
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        } else {
            setError(data.message);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        setError('An error occurred while fetching posts.');
    } finally {
        setLoading(false);
    }
};

  // Add infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = async (postId) => {
    const response = await fetch('http://localhost/witterverseBackend/likePost.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id, postId }),
    });
    const data = await response.json();
    if (data.success) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, isLiked: !post.isLiked } : post
        )
      );
    }
  };

  const lastPostRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadPosts(page);
    }
  }, [page]);

  const Post = ({ post }) => (
    <div key={post.id} className={`post ${post.isPosting ? 'posting' : ''}`}>
      <p>{post.text}</p>
      <div className="post-meta">
        <span>{post.date} - {post.city}</span>
        <div className="post-icons">
          <FaHeart
            onClick={() => handleLike(post.id)}
            className={post.isLiked ? 'active' : ''}
          />
          <Link to={`/post/${post.id}`}>  <FaComment /></Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="confessions-and-stories">
        <div className="user-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
        </div>
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
            {posts.length > 0 ? (
                posts.map((post, index) => {
                    if (index === posts.length - 1) {
                        return <Post key={post.id} post={post} ref={lastPostRef} />;
                    } else {
                        return <Post key={post.id} post={post} />;
                    }
                })
            ) : (
                !loading && <p>No posts available</p>
            )}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>} {/* Error message display */}
    </div>
);

}

export default ConfessionsAndStories;
