import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary';

class ColumnRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initially a string
      content: '{"function":"I live to crash"}' 
    };
  }

  // Function to crash the app by replacing string with object
  replaceStringWithObject = () => {
    const parsed = JSON.parse(this.state.content);
    this.setState({ content: parsed });
  }

  // Function to trigger event handler error (not caught by Error Boundary)
  invokeEventHandler = () => {
    // eslint-disable-next-line no-undef
    console.log(undefinedVariable); 
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Right Column</h5>
            <p className="card-text">This column contains the logic to test errors.</p>
            
            <div className="mb-3">
              <button 
                className="btn btn-warning me-2" 
                onClick={this.invokeEventHandler}
              >
                Invoke event handler
              </button>
              
              <button 
                className="btn btn-danger" 
                onClick={this.replaceStringWithObject}
              >
                Replace string with object
              </button>
            </div>

            <hr />

            {/* 
               Instruction 4: Wrap the crashing paragraph in ErrorBoundary.
               This ensures only this part crashes, not the whole column.
            */}
            <ErrorBoundary>
              <p className="card-text">
                {this.state.content}
              </p>
            </ErrorBoundary>

          </div>
        </div>
      </div>
    );
  }
}

export default ColumnRight;