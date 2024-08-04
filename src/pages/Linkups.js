import React from 'react';
import './linkups.css';

function Linkups() {
  return (
    <div className='linkup-page'>
    <div className="page">
      
      <p>Find and share linkups </p>
      <div>
        <input placeholder='What are you looking for?'></input>
      </div> 
      <h3>Join the Conversation For something exiting</h3>
      <div className='linkups'>

        <div className='linkup-item'>
          <div>
            <h2>Up for a Movie</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Out For Clubbing</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
              <h2>Looking for Love</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Lets Be Friends</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Free Tonight</h2>
            </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Coffe Date</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Game Night</h2>
          </div>
        </div>
        <div className='linkup-item'>
          <div>
            <h2>Nature Lovers</h2>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Linkups;
