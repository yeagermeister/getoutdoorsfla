import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_COMMENTS} from '../utils/queries';
import Auth from '../utils/auth';



const ProfileComments = (props) => {

    const [userID, setUserID] = useState('');

    useEffect(() => {
      
        setUserID(props.userid);
      
    }, []);
    
    const { loading, data } = useQuery(FIND_USER_COMMENTS, {
        variables: { userID: userID || "" }, // provide a default value if username is falsy
      });

console.log(props)

  const commentData = data && data.findUserComments
    return (
<>
<h2>My Comments:</h2>
{commentData ?(commentData.map((comment) => (
            <li key={comment._id}>
              <p>comment:{comment.comment} </p>
              <p>on: {comment.site.siteName} </p>
              <p> at: {comment.createdAt}</p>
            </li>
          ))) : <div> no comments yet!</div>}
</>
        
    )
}
export default ProfileComments