import React, { useState, useEffect } from 'react';
const Comments = ({comments}) => {


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