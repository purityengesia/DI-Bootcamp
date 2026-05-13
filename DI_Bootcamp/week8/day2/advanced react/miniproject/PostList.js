import React, { Component } from 'react';

class PostList extends Component {
  // Constructor with props, super props, and state declaration
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: ''
    };
  }

  // Lifecycle method to fetch data
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => 
        // Update state when data is loaded
        this.setState({ posts: data })
      )
      .catch(error => 
        this.setState({ errorMsg: 'Error retrieving data' })
      );
  }

  render() {
    // Destructure properties from state
    const { posts, errorMsg } = this.state;

    return (
      <div className="card p-4 mb-4 shadow-sm">
        <h3>Posts List</h3>
        
        {/* If posts array is not empty, render the data */}
        {posts.length ? (
          <ul className="list-group list-group-flush">
            {posts.map(post => (
              <li key={post.id} className="list-group-item">
                <strong>#{post.id} {post.title}</strong>
                <p className="mb-0 text-muted small mt-1">{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts to display.</p>
        )}

        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </div>
    );
  }
}

export default PostList;