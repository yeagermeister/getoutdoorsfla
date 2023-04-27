import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, DELETE_COMMENT } from '../../utils/mutations';
import { Link } from 'react-router-dom'
import { gql } from '@apollo/client'
import Auth from '../../utils/auth'
const Comments = ({ site }) => {


  const [commentText, setCommentText] = useState('');
 

  const [sitenum, setUsernum] = useState('');
  const [usernamed, setUsername] = useState('');
  const [comments, setComments] = useState(site.comment);
  const [commentid, setcommentid] = useState('')
  useEffect(() => {
    
    setUsernum(site.site._id);
    let user = Auth.getProfile()
    if (user){
      setUsername(user.data._id);
    }
    
    setComments(site.site.comment);
    
    
  }, [site]);
 
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

  const [deleteComment, { deleteError }] = useMutation(DELETE_COMMENT, {
    update(cache, { data: { deleteComment } }) {
      cache.modify({
        id: cache.identify(site.site._id),
        fields: {
          comments(existingComments = []) {
            return existingComments.filter(
              (commentRef) => commentRef.__ref !== `Comment:${deleteComment.commentId}`
            );
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
  const handleDeleteComment = async (commentId) => {
    setcommentid(commentId)
    try {
      await deleteComment({
        variables: { commentId },
      });
    } catch (deleteError) {
      console.error(deleteError);
    }
  };

  return (
    <div className=' siteCard rounded'>
      {sitecomments ? (
        sitecomments.map(comment => (
        <div key={comment._id}>
          <p >{comment.comment}</p>
          <p>
            Posted by {comment.userID ? comment.userID.username : 'Unknown'}{' '}
            on {comment.createdAt}
            {Auth.loggedIn() ? (Auth.getProfile().data.username === comment.userID?.username && (
              <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            )) : ( <p></p>)}
          </p>
        </div>
      ))): <div>no comments yet!</div>}
      {Auth.loggedIn() && (
        <form className='rounded specform siteCard m-2' onSubmit={handleFormSubmit}>
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
      
    </div>
  );
};

export default Comments;