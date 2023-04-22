import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT} from '../../utils/mutations';
import { gql } from '@apollo/client'
const Comments = ({ comments, siteId }) => {
    const [commentText, setCommentText] = useState('');
    const [username, setUsername] = useState('');
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
                variables: { comment: commentText, username, siteId },
              });
              setCommentText('');
              setUsername('');
            } catch (err) {
              console.error(err);
            }
          };
          
// let comment = props.data.findOneSite.comment
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
      <div className="text">{comment.Comment}</div>
    </div>
  </div> 
  ))} */}
  
  <form className="ui reply form">
    <div className="field">
      <textarea defaultValue={""} />
    </div>
    <div className="ui blue labeled submit icon button">
      <i className="icon edit" /> Add Reply
    </div>
  </form>
</div>

)}

export default Comments