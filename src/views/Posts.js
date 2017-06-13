
import React from 'react';
let _  = require('underscore');


export const Posts = ({ users, microposts }) => {

  document.title = "Micropost Hub";

  function findPoster(poster_id) {
    return _.find(users, function(user) {
       return user.id === poster_id;
     });
  }

  function perPost(micropost) {
    let user = findPoster(micropost.user_id);

    let responses;
    let i = 0;
    if (micropost.responses.length > 0) {
      responses = micropost.responses.map(function(response) {
        return (
          <li key={i++}>
            <span className="responder">{findPoster(response.user_id).username}</span>
            <span> replied: </span>
            <span className="content">{response.content}</span>
          </li>
        );
      });

    } else {
      responses = <li className="empty">No responses available.</li>;
    }

    return (
      <ul className="microposts">
        <li>
          <span className="poster">{user.username}</span>
          <span> said: </span>
          <span className="content">{micropost.content}</span>
          <div>&nbsp;</div>
        </li>
        {responses}
      </ul>
     );
  }

  let i = 0;
  let structure, elem;
  structure = microposts.map(function(micropost) {
    elem = perPost(micropost);
    return (
      <div key={i++}>{elem}</div>
    );
  });


  return (
    <div>
      <h1 className="center">Recent Posts</h1>
      {structure}
    </div>
  )

}
