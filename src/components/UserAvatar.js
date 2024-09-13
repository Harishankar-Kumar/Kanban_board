import React from 'react';

const UserAvatar = ({ userId }) => {
  
  const avatarUrl = 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';
  return (
    <img src={avatarUrl} alt="User Avatar" className="user-avatar" />
  );
};

export default UserAvatar;
