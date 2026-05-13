import React, { Component } from 'react';

export default class App extends Component {
  state = {
    response: '',       // Stores GET message
    post: '',           // Stores user input
    responseToPost: ''  // Stores POST response
  };

  // PART I: Fetch message on component mount
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // PART II: Handle form submission
  handleSubmit = async e => {
    e.preventDefault();
    
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    
    const body = await response.text(); // The server sends back plain text
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        {/* PART I: Display GET Message */}
        <h1>{this.state.response}</h1>

        {/* PART II: Form for POST Request */}
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
            placeholder="Type something here..."
            style={{ padding: '5px', marginRight: '10px' }}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Display Server Response below input */}
        <p style={{ marginTop: '20px', color: 'blue' }}>{this.state.responseToPost}</p>
      </div>
    );
  }
}