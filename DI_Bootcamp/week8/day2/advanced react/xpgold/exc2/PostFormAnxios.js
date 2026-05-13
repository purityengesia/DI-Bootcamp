import React, { Component } from 'react';
import axios from 'axios';

class PostFormAxios extends Component {
  // Constructor function with props, super props and state
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      body: ''
    };
  }

  // Handle change for inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  handleSubmit = (e) => {
    e.preventDefault();

    // Destructure variables from state
    const { userId, title, body } = this.state;
    
    const payload = {
      userId,
      title,
      body
    };

    // POST the data with axios
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API URL if needed

    axios.post(url, payload)
      .then(response => {
        console.log("Axios Response:", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // Destructure variables from state to use in values
    const { userId, title, body } = this.state;

    return (
      <div className="card p-4">
        <h4>Exercise 2: Axios POST</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input 
              type="text" 
              name="userId" 
              placeholder="Enter User ID" 
              className="form-control"
              value={userId} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter Title" 
              className="form-control"
              value={title} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Body</label>
            <input 
              type="text" 
              name="body" 
              placeholder="Enter Body Content" 
              className="form-control"
              value={body} 
              onChange={this.handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostFormAxios;