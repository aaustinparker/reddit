
import React from 'react';
let _  = require('underscore');


export const Posts = (props) => {

  document.title = "Micropost Hub";

  if (!localStorage.getItem("current_user")) {
    alert("Please log in before posting a comment.");
    props.history.push('/signup');
  }

  let users = JSON.parse(localStorage.getItem("users"));
  let microposts = JSON.parse(localStorage.getItem("microposts"));


  function findPoster(poster_id) {
    return _.find(users, function(user) {
       return user.id === poster_id;
     });
  }


  function makePost(event) {
    event.preventDefault();
    let content = document.getElementById("comment").value;
    if (content.length === 0) {
      alert("Please type out a post before submitting.");
    } else {
      props.newPost()(content);
      document.getElementById("comment").value = '';
    }
  }


  function makeComment(event) {
    event.preventDefault();
    let post_id = event.target.dataset.post_id;
    let content = document.getElementById("response" + post_id).value;
    if (content.length === 0) {
      alert("Please type out a comment before submitting.");
    } else {
      props.newComment()(parseInt(post_id), content);
      document.getElementById("response" + post_id).value = '';
    }
  }


  function removeComment(event) {
    let post_id = parseInt(event.target.dataset.post_id);
    let response_id = parseInt(event.target.dataset.response_id);
    props.deleteComment()(post_id, response_id);
  }


  function removePost(event) {
    let post_id = parseInt(event.target.dataset.post_id);
    props.deletePost()(post_id);
  }


  function upvote(event) {
    let target = event.target.id;
    let divider = target.indexOf("_");
    props.update()(
      parseInt(target.substring(0, divider)),
      target.substring(divider+ 1),
      ""
    );
  }


  function perPost(micropost) {
    let user = findPoster(micropost.user_id);

    let deleteAndEditComment;

    let responses;
    let i = 0;
    if (micropost.responses.length > 0) {
      responses = micropost.responses.map(function(response) {
        if (parseInt(localStorage.getItem("current_user")) === response.user_id) {
          deleteAndEditComment = (
            <span>
            <button type="button" onClick={() =>
              props.history.push('/edit/' + micropost.post_id + "_" + response.response_id)}>
              Edit</button>
            <button data-post_id={micropost.post_id}  data-response_id={response.response_id}
              type="button" onClick={removeComment}>Delete</button>
            </span>
          );
        } else {
          deleteAndEditComment = <img id={micropost.post_id + "_" + response.response_id}
            onClick={upvote} className="upvote" alt="" src="./img/upvote.jpeg" />;
        }

        return (
          <li key={i++}>
            <span className="responder">{findPoster(response.user_id).username}</span>
            <span> replied: </span>
            <span className="content">{response.content}</span>
            <span> &nbsp; </span>
            {deleteAndEditComment}
            <span>  &nbsp; &nbsp; ({response.upvotes} upvotes)</span>
          </li>
        );
      });
    } else {
      responses = <li className="empty">No responses currently available.</li>;
    }

    let deleteAndEditPost;
    if (parseInt(localStorage.getItem("current_user")) === micropost.user_id) {
      deleteAndEditPost = (
        <span>
        <button type="button" onClick={() =>
          props.history.push('/edit/' + micropost.post_id + "_n")}>
          Edit</button>
        <button data-post_id={micropost.post_id} type="button"
          onClick={removePost}>Delete</button>
        </span>
      );
    } else {
      deleteAndEditPost = <img onClick={upvote} id={micropost.post_id + "_n"}
       className="upvote" alt="" src="./img/upvote.jpeg" />;
    }

    let id = "response" + micropost.post_id;
    return (
      <ul className="microposts">
        <li>
          <span className="poster">{user.username}</span>
          <span> said: </span>
          <span className="content">{micropost.content}</span>
          <span>  &nbsp;   </span>
          {deleteAndEditPost}
          <span>  &nbsp; &nbsp; ({micropost.upvotes} upvotes)</span>
        </li>
        {responses}
        <li>
          <form data-post_id={micropost.post_id} onSubmit={makeComment}>
            <table id="response_form">
              <tbody>
                <tr>
                  <td><label htmlFor="response">You say:  </label></td>
                  <td><textarea className="input response" id={id} name="response"/></td>
                  <td><button type="submit">Respond</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </li>
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
