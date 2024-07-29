import React, { useState, useEffect } from 'react';
import './EncountersPage.css';

import { MdCoffee } from "react-icons/md";
import { IoChatbubble } from "react-icons/io5";
import { FaHeart, FaPlus } from "react-icons/fa";

function EditProfile() {
    const [profilePic, setProfilePic] = useState(null);
    const [whyHere, setWhyHere] = useState('');

     
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePic(file);
      }
    };
  
    const handleChangePhoto = () => {
      setProfilePic(null);
    };
  
  
  
return(
    <div className='encounters-page'>
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
                  <input type="file" onChange={handlePhotoChange} />
                  Add Photo
                </label>
              )}
            </div>
            {profilePic && (
              <div className='upload-done' onClick={handleChangePhoto}>
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
            <button>Finish</button>
          </div>
          </div>
)
}

export default EditProfile;