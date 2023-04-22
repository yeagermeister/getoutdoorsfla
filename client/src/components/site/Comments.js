import React, { useState, useEffect } from 'react';
const Comments = (props) => {


// let comment = props.data.findOneSite.comment
return (


    <div className="ui comments">
  <h3 className="ui dividing header">Comments</h3>
  {/* <div className="comment">
    
    <div className="content">
      <a className="author">{props.data.findOneSite.comment.username}</a>
      <div className="metadata">
        <span className="date">{props.data.findOneSite.comment.createdAt}</span>
      </div>
      <div className="text">{props.data.findOneSite.comment.Comment}</div>
    </div>
  </div> */}
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