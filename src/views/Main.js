

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


import { App } from './App';
import { Signup } from './Signup';
import { Posts } from './Posts';


export class Main extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          user_id: 6,
          users: [
            {id: 1, username: "parker", password: "password" },
            {id: 2, username: "craig", password: "password" },
            {id: 3, username: "jeffrey", password: "password" },
            {id: 4, username: "leonard", password: "password" },
            {id: 5, username: "johnny", password: "password" }
          ],
          microposts: [
            {id: 1, user_id: 1, content: "I quite enjoy watching the Cavs lose",
              responses: [
                {user_id: 2, content: "Lame opinion guy"}
              ]},
            {id: 2, user_id: 2, content: "Boy that guy was dumb",
              responses: [
                {user_id: 3, content: "Ur both dumb roflcopter"}
              ]},
            {id: 3, user_id: 4, content: "I took a picture of my breakfast. Validate me.",
              responses:
                []
            }
          ]
      };
      this.test = this.test.bind(this);
      this.newUser = this.newUser.bind(this);
  }


  test() {
    return "test";
  }


  newUser(user) {
    let user_id = this.state.user_id;
    let temp = this.state.users;
    temp.push({
      id: user_id,
      username: user.username,
      password: user.password
    });
    this.setState({
      user_id: user_id++,
      users: temp
    })
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={ (props) => (<App message="hello" test={() => this.test} />) } />
          <Route path="/signup" render={ (props) => (<Signup {...props} newUser={() => this.newUser} />) }/>
          <Route path="/posts" render={ (props) => (<Posts {...props} users={this.state.users} microposts={this.state.microposts} />) }/>
        </div>
      </Router>
    )
  }
}
