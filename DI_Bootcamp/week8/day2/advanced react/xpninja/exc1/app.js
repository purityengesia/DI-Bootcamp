import React, { Component } from 'react';

export default class App extends Component {
  // 1. Initialize state with an empty array
  state = {
    users: []
  };

  // 2. Fetch data in componentDidMount
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.error(err));
  }

  // 3. Display the array of users as a list
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>User List</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}