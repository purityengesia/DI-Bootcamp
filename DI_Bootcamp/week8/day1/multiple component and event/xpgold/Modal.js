// src/Modal.js
import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal-background">
        <div className="modal-body">
          <h2>Error Encountered</h2>
          <p>An error has occurred in the application.</p>
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;