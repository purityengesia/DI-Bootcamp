import React, { Component } from 'react';

class PostFormFetch extends Component {
  // Initialize state
  state = {
    user: '',
    email: ''
  };

  // Handle change for both inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  handleSubmit = (e) => {
    e.preventDefault();
    
    // Get input values from state
    const payload = {
      user: this.state.user,
      email: this.state.email
    };

    // Use fetch to POST data
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API URL if needed
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Fetch Response:", data))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="card p-4 mb-4">
        <h4>Exercise 1: Fetch POST</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User</label>
            <input 
              type="text" 
              name="user" 
              className="form-control" 
              value={this.state.user} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={this.state.email} 
              onChange={this.handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostFormFetch;