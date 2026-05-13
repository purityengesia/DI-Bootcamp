// App.js
import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

// --- Exercise 1: BuggyCounter Component ---
class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

// --- Exercise 3: Child Component ---
class Child extends Component {
  componentWillUnmount() {
    alert("Unmounted message (The Child component is being removed)");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

// --- Exercise 2 & 3: Lifecycle Demo Component ---
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  componentDidMount() {
    // Part II: Timer changes state after mounting
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000); // Changes to yellow after 2 seconds
  }

  // Part I: shouldComponentUpdate
  shouldComponentUpdate() {
    // Returning true allows the component to update
    return true;
  }

  // Part III: getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  // Part II: componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  }

  deleteHeader = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div style={{ border: '1px solid black', padding: '10px', margin: '20px 0' }}>
        <h2>Exercise 2 & 3: Lifecycle Demo</h2>
        
        {/* Exercise 2 & 3 Output */}
        <h3>My Favorite Color is {this.state.favoriteColor}</h3>
        
        <button onClick={this.changeColor}>Change Color to Blue</button>
        <button onClick={this.deleteHeader}>Delete Header</button>
        
        {/* Conditional Rendering for Exercise 3 */}
        {this.state.show && <Child />}
      </div>
    );
  }
}

// --- Main App Component ---
export default class App extends Component {
  render() {
    return (
      <div className="App" style={{ padding: '20px' }}>
        <h1>Exercise 1: Error Boundary Simulations</h1>

        {/* Simulation 1: Two counters inside one ErrorBoundary */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Simulation 1: Both wrapped in one ErrorBoundary</h3>
          <p><strong>Instruction:</strong> Click either counter until it reaches 5. Both will be replaced by the error message.</p>
          <ErrorBoundary>
            <BuggyCounter />
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        {/* Simulation 2: Each counter has its own ErrorBoundary */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Simulation 2: Each wrapped in individual ErrorBoundary</h3>
          <p><strong>Instruction:</strong> Click one counter until it reaches 5. Only that one will be replaced by the error message.</p>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        {/* Simulation 3: No ErrorBoundary */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Simulation 3: No ErrorBoundary</h3>
          <p><strong>Instruction:</strong> Click until 5. The entire app will crash and go blank. Refresh to restart.</p>
          <BuggyCounter />
        </div>

        <hr />

        {/* Exercise 2 & 3 Component */}
        <LifecycleDemo />

      </div>
    );
  }
}