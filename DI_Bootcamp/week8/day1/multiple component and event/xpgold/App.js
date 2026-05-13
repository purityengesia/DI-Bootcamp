// src/App.js
import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

// An internal component designed to crash when the button is clicked
class CrashableButton extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldCrash: false };
  }

  handleClick = () => {
    // Update state to trigger a render error
    this.setState({ shouldCrash: true });
  }

  render() {
    // If state says crash, throw an error to trigger ErrorBoundary
    if (this.state.shouldCrash) {
      throw new Error('I crashed!');
    }

    return (
      <button onClick={this.handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Trigger Error
      </button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // Requirement 7: Hold details of the error in state (initialized to null)
    this.state = {
      errorInfo: null
    };
  }

  render() {
    return (
      <div className="App" style={{ padding: '50px', textAlign: 'center' }}>
        <h1>React Error Boundary Exercise</h1>
        
        {/* Wrap the crashable component in the ErrorBoundary */}
        <ErrorBoundary>
          <CrashableButton />
        </ErrorBoundary>

      </div>
    );
  }
}

export default App;