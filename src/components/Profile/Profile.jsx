import React from 'react';
import './profile.css';

import profile from '../../images/profile.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  return (
    <div className='Profile'>
      <img src={profile} className='profile-picture'></img>
      <div className='dot'>
        <FontAwesomeIcon icon={faHatCowboy} className='iconos-header3' />
      </div>
    </div>
  );
}

export default Profile;


