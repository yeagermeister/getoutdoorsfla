import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_COMMENTS} from '../utils/queries';
import Auth from '../utils/auth';



const ProfileComments = (props) => {

    const [userID, setUserID] = useState('');

    useEffect(() => {
      
        setUserID(props.userid);
      
    }, [props.userid]);
    
    
    const { loading, data } = useQuery(FIND_USER_COMMENTS, {
        variables: { userID: userID || "" }, // provide a default value if username is falsy
      });
      if (loading) {
        return <div>Loading...</div>;
      }

console.log(props)

  const commentData = data && data.findUserComments
    return (
<>
<h2 className='rounded flex justify-content-center row'>My Comments:</h2>
{commentData ?(commentData.map((comment) => (
            <li className='rounded flex justify-content-center  col-3 border border-success' key={comment._id}>
              <p className="head">comment: </p>{comment.comment}
              <p className="head">on:  </p>{comment.site.siteName}
              <p className="head"> at: </p>{comment.createdAt}
            </li>
          ))) : <div> no comments yet!</div>}
</>
        
    )
}
export default ProfileComments