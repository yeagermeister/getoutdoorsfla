import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_COMMENTS, FIND_USER_RATINGS } from '../utils/queries';
import Auth from '../utils/auth';
const Profile = () => {
  const user = Auth.getProfile();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    if (user){
      setUserID(user.data._id);
    }
  }, [userID]);

  const { loading, data } = useQuery(FIND_USER_COMMENTS, {
    variables: { userID: userID || "" }, // provide a default value if username is falsy
  });
  const { load, data: dater } = useQuery(FIND_USER_RATINGS, {
    variables: { userID: userID || "" }, // provide a default value if username is falsy
  });

  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data, dater)
  const ratingData = dater.findUserRatings
  const commentData = data.findUserComments
  return (
    <div>
      <h1>Welcome to {user.username}'s Profile</h1>
      <div>
        <h2>My Comments:</h2>
        <ul>
          {commentData ?(commentData.map((comment) => (
            <li key={comment._id}>
              <p>comment:{comment.comment} </p>
              <p>on: {comment.site.siteName} </p>
              <p> at: {comment.createdAt}</p>
            </li>
          ))) : <div> no comments yet!</div>}
         {ratingData ?(ratingData.map((rating) => (
            <li key={rating._id}>
              <p>rating:{rating.rating} </p>
              <p>on: {rating.site.siteName} </p>
            </li>
          ))) : <div> no ratings yet!</div>}
        </ul>
      </div>
    </div>
  );
};

export default Profile;