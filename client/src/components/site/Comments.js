import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT} from '../../utils/mutations';
import { gql } from '@apollo/client'

const Comments = ({ comments, siteId }) => {
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');
  console.log(commentText)
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // Update the site's comment list in the cache
      cache.modify({
        id: cache.identify(siteId),
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
        variables: { comment: commentText, siteId },
      });
      setCommentText('');
      setUsername('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {/* {comments.map(comment => (
        <div className="comment">
          <div className="content">
            <a className="author">{comment.username}</a>
            <div className="metadata">
              <span className="date">{comment.createdAt}</span>
            </div>
            <div className="text">{comment.comment}</div>
          </div>
        </div> 
      ))} */}
      <form className="ui reply form">
        <div className="field">
          <textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} />
        </div>
        <div className="ui blue labeled submit icon button">
          <i className="icon edit"/>
          <button onClick={handleFormSubmit}>Add Reply</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;