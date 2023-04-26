import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_COMMENTS} from '../utils/queries';
import Auth from '../utils/auth';



const ProfileComments = (props) => {

    const [userID, setUserID] = useState('');

    useEffect(() => {
      
        setUserID(props.userid);
      
    }, [props.userid]);
    
    useEffect(() => {
      // Update the userID state value when the userid prop changes
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
        <div className="d-flex flex-wrap align-content-start">
            {commentData ? (commentData.map((comment) => (
                <div className='col-4 mb-3' key={comment._id}>
                    <li className='rounded border border-success'>
                        <p className="head">comment: </p>{comment.comment}
                        <p className="head">on:  </p>{comment.site.siteName}
                        <p className="head"> at: </p>{comment.createdAt}
                    </li>
                </div>
            ))) : <div> no comments yet!</div>}
        </div>
    </>
)
}

export default ProfileComments