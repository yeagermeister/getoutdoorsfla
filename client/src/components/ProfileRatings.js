import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_RATINGS } from '../utils/queries';
import Auth from '../utils/auth';

const ProfileRatings = (props) => {


    const [userID, setUserID] = useState('');

    useEffect(() => {
      
        setUserID(props.userid);
      
    }, [props.userid]);
    console.log(props)
    const { loading, data } = useQuery(FIND_USER_RATINGS, {
        variables: { userID: userID || "" }, // provide a default value if username is falsy
      });
      if (loading) {
        return <div>Loading...</div>;
      }
      const ratingData = data && data.findUserRatings;
    return (
        <>
        <h2 className='rounded'>My Ratings:</h2>
        {ratingData ?(ratingData.map((rating) => (
            <li className='rounded border border-success' key={rating._id}>
              <p>rating:{rating.rating} </p>
              <p>on: {rating.site.siteName} </p>
            </li>
          ))) : <div> no ratings yet!</div>}
          </>

    )
}
export default ProfileRatings