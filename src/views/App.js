

import React from 'react';

export class App extends React.Component {

  componentWillMount() {
    document.title = "Landing Page";
  }

  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <h2>{this.props.message}</h2>
        <h3>{this.props.test()()}</h3>
      </div>
    )
  }

}
