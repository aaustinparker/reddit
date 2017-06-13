
import React from 'react';

export const Signup = ({ history, newUser }) => {

  document.title = "Signup Page";

  function submission(event) {
    event.preventDefault();
    newUser()(
      {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      }
    );
    history.push('/');
  }

  return (
    <div>
      <h1 className="center">User Registration!</h1>
      <h2 className="center">Please fill in the fields below to create a new profile.</h2>

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

      </form>
    </div>
  )

}
