import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import './Auth.css';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login onLogin={onLogin} />
      ) : (
        <SignUp />
      )}
      <div className="auth-toggle">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <span onClick={toggleAuthMode} className="auth-toggle-link">
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={toggleAuthMode} className="auth-toggle-link">
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;
