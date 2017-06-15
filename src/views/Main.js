

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


import { App } from './App';
import { Signup } from './Signup';
import { Posts } from './Posts';
import { Edit } from './Edit';

let _  = require('underscore');

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      microposts: []
    };
    this.test = this.test.bind(this);
    this.newUser = this.newUser.bind(this);
    this.newPost = this.newPost.bind(this);
    this.newComment = this.newComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editPost = this.editPost.bind(this);
  }


  componentDidMount() {
    let users, microposts;

    if (!localStorage.getItem("users") || !localStorage.getItem("microposts")) {
      users = [
        {id: 1, username: "parker", password: "password" },
        {id: 2, username: "craig", password: "password" },
        {id: 3, username: "jeffrey", password: "password" },
        {id: 4, username: "leonard", password: "password" },
        {id: 5, username: "johnny", password: "password" }
      ];

      microposts = [
        {post_id: 1, user_id: 1, content: "I quite enjoy watching the Cavs lose", response_num: 1,
          responses: [
            {response_id: 0, user_id: 2, content: "Lame opinion guy"}
          ]},
        {post_id: 2, user_id: 2, content: "Boy that guy was dumb", response_num: 1,
          responses: [
            {response_id: 0, user_id: 3, content: "Ur both dumb roflcopter"}
          ]},
        {post_id: 3, user_id: 4, content: "I took a picture of my breakfast. Validate me.", response_num: 0,
          responses:
            []
        }
      ];

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("microposts", JSON.stringify(microposts));
      localStorage.setItem("user_id", "10");
      localStorage.setItem("post_id", "10");
    } else {
      users = JSON.parse(localStorage.getItem("users"));
      microposts = JSON.parse(localStorage.getItem("microposts"));
    }

    this.setState({
      users: users,
      microposts: microposts
    })
  }


  test() {
    return "test";
  }


  newUser(user) {
    let user_id = parseInt(localStorage.getItem("user_id"));
    let temp = this.state.users;
    temp.push({
      id: user_id,
      username: user.username,
      password: user.password
    });
    localStorage.setItem("current_user", user_id.toString());
    localStorage.setItem("user_id", (user_id + 1).toString());
    localStorage.setItem("users", JSON.stringify(temp));
    this.setState({
      users: temp
    })
  }


  newPost(content) {
     let post_id = parseInt(localStorage.getItem("post_id"));
     let temp = this.state.microposts;
     temp.push({
       post_id: post_id,
       user_id: parseInt(localStorage.getItem("current_user")),
       content: content,
       response_num: 0,
       responses: []
     });
     localStorage.setItem("microposts", JSON.stringify(temp));
     localStorage.setItem("post_id", (post_id + 1).toString());
     this.setState({
       microposts: temp
     })
  }


  newComment(post_id, content) {
    let temp = [];
    _.each(this.state.microposts, function(micropost) {
      if (micropost.post_id !== post_id) {
        temp.push(micropost);
      } else {
        micropost.responses.push({
          user_id: parseInt(localStorage.getItem("current_user")),
          content: content,
          response_id: micropost.response_num
        });
        micropost.response_num++;
        temp.push(micropost);
      }
    });
    localStorage.setItem("microposts", JSON.stringify(temp));
    this.setState({
      microposts: temp
    })
  }


  deletePost(post_id) {
    let temp = [];
    _.each(this.state.microposts, function(micropost) {
      if (micropost.post_id !== post_id) {
        temp.push(micropost);
      }
    });
    localStorage.setItem("microposts", JSON.stringify(temp));
    this.setState({
      microposts: temp
    })
  }


  deleteComment(post_id, response_id) {
    let temp = [];
    _.each(this.state.microposts, function(micropost) {
      if (micropost.post_id !== post_id) {
        temp.push(micropost);
      } else {
        let responses = [];
        _.each(micropost.responses, function(response) {
          if (response.response_id !== response_id) {
            responses.push(response);
          }
        });
        micropost.responses = responses;
        temp.push(micropost);
      }
    });
    localStorage.setItem("microposts", JSON.stringify(temp));
    this.setState({
      microposts: temp
    })
  }


  editPost(post_id, response_id, content) {
    let temp = [];
    _.each(this.state.microposts, function(micropost) {
      if (micropost.post_id === post_id) {
        if (response_id === "n") {
          micropost.content = content;
        } else {
          let responses = [];
          response_id = parseInt(response_id);
          _.each(micropost.responses, function(response) {
            if (response.response_id === response_id) {
              response.content = content;
            }
            responses.push(response);
          });
          micropost.responses = responses;
        }
      }
      temp.push(micropost);
    });
    localStorage.setItem("microposts", JSON.stringify(temp));
    this.setState({
      microposts: temp
    })
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={ (props) => (<App message="hello" test={() => this.test} />) } />
          <Route path="/signup" render={ (props) => (<Signup {...props} newUser={() => this.newUser} />) }/>
          <Route path="/posts" render={ (props) => (
            <Posts
              {...props}
              newPost={() => this.newPost}
              newComment={() => this.newComment}
              deletePost={() => this.deletePost}
              deleteComment={() => this.deleteComment}
            />
          ) }/>
          <Route path="/edit/:post_id" render={ (props) => (<Edit {...props} editPost={() => this.editPost} />) }/>
        </div>
      </Router>
    )
  }
}
