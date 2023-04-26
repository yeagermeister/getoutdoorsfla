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
        <h2 className='rounded flex justify-content-center row'>My Ratings:</h2>
        <div className="d-flex flex-wrap align-content-start">
        {ratingData ?(ratingData.map((rating) => (
          <div className='col-4 mb-3' key={rating._id}>
            <li className='rounded border border-success' key={rating._id}>
              <p className="head">rating: </p>{rating.rating}
              <p className="head">on:  </p>{rating.site.siteName}
            </li>
            </div>
          ))) : <div> no ratings yet!</div>}
          </div>
          </>

    )
}
export default ProfileRatings