import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_RATINGS } from '../utils/queries';
import Auth from '../utils/auth';

const ProfileRatings = (props) => {


    const [userID, setUserID] = useState('');

    useEffect(() => {
      
        setUserID(props.userid);
      
    }, []);

    const { load, data: dater } = useQuery(FIND_USER_RATINGS, {
        variables: { userID: userID || "" }, // provide a default value if username is falsy
      });
      const ratingData = dater && dater.findUserRatings;
    return (
        <>
        <h2>My Ratings:</h2>
        {ratingData ?(ratingData.map((rating) => (
            <li key={rating._id}>
              <p>rating:{rating.rating} </p>
              <p>on: {rating.site.siteName} </p>
            </li>
          ))) : <div> no ratings yet!</div>}
          </>

    )
}
export default ProfileRatings