
import React from 'react';
let _  = require('underscore');


export const Posts = ({ newPost, newComment, history }) => {

  if (!sessionStorage.getItem("user_id")) {
    alert("Please log in before posting a comment.");
    history.push('/signup');
  }

  let microposts = JSON.parse(localStorage.getItem("microposts"));
  let users = JSON.parse(localStorage.getItem("users"));
  console.log(users);
  console.log(microposts);

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
      responses = <li className="empty">No responses currently available.</li>;
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
        <li>
          <form data-post_id={micropost.post_id} onSubmit={makeComment}>
            <table id="response_form">
              <tbody>
                <tr>
                  <td><label htmlFor="response">You say:  </label></td>
                  <td><textarea className="input" id="response" name="response"/></td>
                  <td><button type="submit">Respond</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </li>
      </ul>
     );
  }


  function makePost(event) {
    event.preventDefault();
    newPost()(document.getElementById("comment").value);
    document.getElementById("comment").value = '';
  }


  function makeComment(event) {
    event.preventDefault();
    let post_id = event.target.dataset.post_id;
    let content = document.getElementById("response").value;
    newComment()(post_id, content);
    document.getElementById("comment").value = '';
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

      <form onSubmit={makePost}>
        <table id="comment_table" className="auto_margin">
          <tbody>
            <tr>
              <td><label htmlFor="comment">Leave a comment: </label></td>
              <td><textarea className="input" id="comment" name="comment"/></td>
            </tr>
          </tbody>
        </table>

        <div className="center">
          <button type="submit">Post!</button>
        </div>

      </form>

    </div>
  )

}
