import React, { useState, useEffect } from 'react';
import './EncountersPage.css';
import { MdCoffee } from "react-icons/md";
import { IoChatbubble } from "react-icons/io5";
import { FaHeart, FaPlus } from "react-icons/fa";

const ProfileSetup = ({ profilePic, setProfilePic, whyHere, setWhyHere, handleFinishProfile }) => (
  <div className="profile-setup">
    <h2>Complete Your Dating Profile</h2>
    <p>Upload a photo of yourself</p>
    <div className="photo-upload">
      {profilePic ? (
        <img
          src={URL.createObjectURL(profilePic)}
          alt="Profile"
          className='photo-upload'
        />
      ) : (
        <label className='upload-photo'>
          <FaPlus />
          <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
          Add Photo
        </label>
      )}
    </div>
    {profilePic && (
      <div className='upload-done' onClick={() => setProfilePic(null)}>
        Change Photo
      </div>
    )}
    <div className="why-here">
      <h2>Tell people why you are here?</h2>
      <p>This will be displayed on your profile, you can change it any time</p>
      <label>
        <input
          type="radio"
          value="Here for dating"
          checked={whyHere === 'Here for dating'}
          onChange={(e) => setWhyHere(e.target.value)}
        />
        <MdCoffee /><span> Here for dating</span>
        <p>I want to go on dates and have a good time. No label</p>
      </label>
      <label>
        <input
          type="radio"
          value="Open to chat"
          checked={whyHere === 'Open to chat'}
          onChange={(e) => setWhyHere(e.target.value)}
        />
        <IoChatbubble /> <span>Open to chat</span>
        <p>I'm here to chat and see where it goes. No pressure</p>
      </label>
      <label>
        <input
          type="radio"
          value="Ready for a relationship"
          checked={whyHere === 'Ready for a relationship'}
          onChange={(e) => setWhyHere(e.target.value)}
        />
        <FaHeart /><span> Ready for a relationship</span>
        <p>I'm looking for something that lasts, no games.</p>
      </label>
    </div>
    <button onClick={handleFinishProfile}>Finish</button>
  </div>
);

const Profile = ({ profile, isLiked, handleLike, handleNext }) => (
  <div className="profile">
    <div className='prof_cover'>
      <img src={`http://localhost/witterverseBackend/${profile.profile_pic}`} alt="Profile" />
    </div>
    <div className='prof_info'>
      <h3>{profile.name}</h3>
      <small>{profile.whyHere}</small>
    </div>
    <div className='prof_btns'>
      <button onClick={handleLike} disabled={isLiked}>
        {isLiked ? 'Liked' : 'Like'}
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  </div>
);

function EncountersPage() {
  const [profilePic, setProfilePic] = useState(null);
  const [whyHere, setWhyHere] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost/witterverseBackend/getUserProfile.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        if (!data.user.profile_pic || !data.user.whyHere) {
          setShowProfileSetup(true);
        } else {
          setProfilePic(data.user.profile_pic);
          setWhyHere(data.user.whyHere);
          loadProfiles();
        }
      }
    };
    fetchUserProfile();
  }, []);

  const loadProfiles = async () => {
    const response = await fetch('http://localhost/witterverseBackend/getDatingProfiles.php');
    const data = await response.json();
    if (data.success) {
      setProfiles(data.posts); // Ensure you use 'data.posts' as returned from PHP
    } else {
      console.error('Failed to load profiles:', data.message);
    }
  };

  const handleFinishProfile = async () => {
    setShowPopup(true);
    setPopupMessage('Setting up your profile...');

    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('whyHere', whyHere);
    formData.append('profilePic', profilePic);

    const response = await fetch('http://localhost/witterverseBackend/updateUserProfile.php', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setShowProfileSetup(false);
      loadProfiles();
      setPopupMessage('Profile setup complete!');
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setPopupMessage('Error setting up profile. Please try again.');
      console.error('Error setting up profile:', data.message);
    }
  };

  const handleLike = async () => {
    const userId = localStorage.getItem('userId');
    const likedUserId = profiles[currentProfileIndex].id;

    const response = await fetch('http://localhost/witterverseBackend/likeUser.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, likedUserId }),
    });

    const data = await response.json();
    if (data.success) {
      setLikedProfiles((prevLikedProfiles) => [...prevLikedProfiles, likedUserId]);
      handleNext();
    } else {
      setPopupMessage(`Error liking profile: ${data.message}`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      console.error('Error liking profile:', data.message);
    }
  };

  const handleNext = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  return (
    <div className="encounters-page">
      <div className="encounters-page-content">
        {showProfileSetup ? (
          <ProfileSetup
            profilePic={profilePic}
            setProfilePic={setProfilePic}
            whyHere={whyHere}
            setWhyHere={setWhyHere}
            handleFinishProfile={handleFinishProfile}
          />
        ) : profiles.length > 0 ? (
          <div className="profiles">
            <Profile
              profile={profiles[currentProfileIndex]}
              isLiked={likedProfiles.includes(profiles[currentProfileIndex].id)}
              handleLike={handleLike}
              handleNext={handleNext}
            />
          </div>
        ) : (
          <p>Loading profiles...</p>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default EncountersPage;
