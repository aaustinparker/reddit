
import React from 'react';

export const Edit = (props) => {

  document.title = "Edit Post";

  function submission(event) {
    event.preventDefault();
    let queryParam = props.match.params.post_id;
    let divider = queryParam.indexOf("_");
    props.editPost()(
        parseInt(queryParam.substring(0, divider)),
        queryParam.substring(divider + 1),
        document.getElementById("comment").value
    );
    props.history.push('/posts');
  }

  return (
    <div>
      <h1 className="center">Update An Existing Post</h1>
      <h2 className="center">Please enter the modified content below.</h2>

      <form onSubmit={submission}>
        <table className="auto_margin">
          <tbody>
            <tr>
              <td><label htmlFor="update">Revised comment: </label></td>
              <td><textarea className="input" id="comment" name="comment"/></td>
            </tr>
          </tbody>
        </table>
        <br />

        <div className="center">
          <button type="submit">Update!</button>
        </div>

      </form>
    </div>
  )

}
