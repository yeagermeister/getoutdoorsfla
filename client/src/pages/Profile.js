import React, { useEffect, useState} from 'react';
import ProfileRatings from'../components/ProfileRatings'
import ProfileComments from'../components/ProfileComments'
import Auth from '../utils/auth';

const Profile = () => {
  const user = Auth.getProfile();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    if (user){
      setUserID(user.data._id);
    }
  }, [user]);

 

  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view this page.</div>;
  }
  return (
    <div>
      <h1 classname="bg">Welcome to {user.data.username}'s Profile</h1>
      <div>
        <ul className=' m-5 submitterinoouter'>
         <ProfileComments userid={userID}/>
         <ProfileRatings userid={userID}/>
        </ul>
      </div>
    </div>
  );
};

export default Profile;