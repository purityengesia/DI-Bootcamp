import React, { Component } from 'react';
import FormComponent from '../../multiple component and event/daillychallenge/FormComponent';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "male",
      destination: "Japan",
      lactoseFree: false
    };
  }

  // 2. Create a function named handleChange
  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Logic: Check if type is checkbox. 
    // If yes, use 'checked', otherwise use 'value'.
    // We use a Ternary Operator as requested: condition ? true : false
    const newValue = type === "checkbox" ? checked : value;

    this.setState({
      [name]: newValue
    });
  };

  // 4. On submit, pass data to URL
  handleSubmit = (event) => {
    event.preventDefault();

    // Constructing the Query String manually to match the expected output format exactly
    const { firstName, lastName, age, gender, destination, lactoseFree } = this.state;
    
    // We need 'on' instead of true for the checkbox to match the example
    const lactoseValue = lactoseFree ? "on" : "off"; 
    
    const queryString = `?firstName=${firstName}&lastName=${lastName}&age=${age}&gender=${gender}&destination=${destination}&lactoseFree=${lactoseValue}`;

    // Update the browser URL without reloading the page
    window.history.pushState(null, null, queryString);
    
    // Or if you want to actually reload the page (standard form behavior):
    // window.location.href = queryString;
    // But usually in React apps we prefer history.pushState for a smoother UX.
    
    console.log("Form Submitted! URL updated.");
  };

  render() {
    return (
      <div className="app">
        <FormComponent 
          data={this.state} 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;