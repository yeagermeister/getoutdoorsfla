import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT} from '../../utils/mutations';
import { Link } from 'react-router-dom'
import { gql } from '@apollo/client'
import Auth from '../../utils/auth'
const Comments = ({ site }) => {


  const [commentText, setCommentText] = useState('');
 

  const [sitenum, setUsernum] = useState('');
  const [usernamed, setUsername] = useState('');
  const [comments, setComments] = useState(site.comment);

  useEffect(() => {
    
    setUsernum(site.site._id);
    let user = Auth.getProfile()
    if (user){
      setUsername(user.data._id);
    }
    
    setComments(site.site.comment);
    
  }, [site]);
  console.log(usernamed)
 console.log(site.site.comments)
 let sitecomments = site.site.comments
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // Update the site's comment list in the cache
      cache.modify({
        id: cache.identify(sitenum),
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: addComment,
              fragment: gql`
                fragment NewComment on Comment {
                  commentId
                  comment
                  createdAt
                  username {
                    username
                  }
                }
              `,
            });
            return [...existingComments, newCommentRef];
          },
        },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addComment({
        variables: { comment: commentText, siteId: sitenum, userID: usernamed },
      });
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() && (
        <form onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Leave a comment about this site..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
      {!Auth.loggedIn() && (
        <p>
          You need to be logged in to leave a comment.{' '}
          <Link to="/login">Click here to log in.</Link>
        </p>
      )}
      {sitecomments ? (
        sitecomments.map(comment => (
        <div key={comment._id}>
          <p>{comment.comment}</p>
          <p>
            Posted by {comment.username ? comment.username.username : 'Unknown'}{' '}
            on {comment.createdAt}
          </p>
        </div>
      ))): <div>no comments yet!</div>}
    </div>
  );
};

export default Comments;