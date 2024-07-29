import React, { useEffect, useState } from 'react';
import './Profile.css'
import { NavLink } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost/witterverseBackend/getUser.php?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='profile_page'>
    <div >
    <div className="page">
      <div className='profile_user'>
        <div>
        <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt="Profile" />
        </div>
        <div>
<h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className='whyHere_p'>{user.whyHere}</p>

        </div>
      
      </div>
      <NavLink to="/edit-profile" activeClassName="active">
      <button>Edit Profile</button>
          </NavLink>
      
    </div>
    <div className='page'>
      <h2>Your Profile Photos</h2>
      <div className='profphotos'>
      <div>
      <img src={`http://localhost/witterverseBackend/${user.profile_pic}`} alt="Profile" /></div>
     <div className='prof_photos'>
      <div><span>+</span></div>
     <div><span>+</span></div>
     <div><span>+</span></div></div>
     
      </div>
      <button>Add More Photos</button>
      </div>
    </div>
    </div>
    
  );
}

export default Profile;
