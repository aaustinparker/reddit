
import React from 'react';
import { Link } from 'react-router-dom';

let _  = require('underscore');

export const Login = ({ history, encrypt }) => {

  document.title = "Login Page";

  let users = JSON.parse(localStorage.getItem("users"));

  function submission(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let visitor = _.find(users, function(user) {
      return user.username === username && user.password === encrypt()(password, user.salt);
    });
    if (!visitor) {
      document.getElementById("username").value = '';
      document.getElementById("password").value = '';
      alert("No user found. Please try again.");
    } else {
      localStorage.setItem("current_user", visitor.id.toString());
      history.push('/posts');
    }
  }

  return (
    <div>
      <h1 className="center">Welcome to <span id="header">Reddit v2!</span></h1>
      <h2 className="center">Returning users, enter your credentials below.</h2>

      <form onSubmit={submission}>
        <table className="auto_margin">
          <tbody>
            <tr>
              <td><label htmlFor="username">Username:</label></td>
              <td><input type="text" id="username" name="username"/></td>
            </tr>
            <tr>
               <td><label htmlFor="password">Password:</label></td>
               <td><input type="password" id="password" name="password"/></td>
            </tr>
          </tbody>
        </table>
        <br />

        <div className="center">
          <button type="submit">Submit</button>
        </div>

        <br />
        <br />
        <div className="center">
          <Link to='/signup'>New user? Click here to register!</Link>
        </div>
        <br />
        <br />

        <img id="landing_pic" alt="" src="./img/logo.jpg" />

      </form>
    </div>
  )

}
