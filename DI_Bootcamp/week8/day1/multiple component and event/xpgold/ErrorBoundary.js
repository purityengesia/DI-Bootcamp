// src/ErrorBoundary.js
import React, { Component } from 'react';
import Modal from './Modal';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Requirement 6: Method to manually trigger the error state
  occurError() {
    this.setState({ hasError: true });
  }

  // Requirement 7: Lifecycle method to catch errors
  componentDidCatch(error, errorInfo) {
    console.log("Error caught by boundary:", error, errorInfo);
    // You can also log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // Render the Modal when hasError is true
      return (
        <Modal 
          onClose={() => this.setState({ hasError: false })} 
        />
      );
    }
    // Normally render children
    return this.props.children;
  }
}

export default ErrorBoundary;