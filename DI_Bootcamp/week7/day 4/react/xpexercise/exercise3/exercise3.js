// src/Exercise3.js
import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* Part II: Style object applied to h1 */}
        <h1 style={style_header}>My Header</h1>
        
        {/* Part III: CSS class applied to paragraph */}
        <p className="para">
          This is a paragraph with external CSS styling.
        </p>
        
        {/* Part I: Various HTML tags */}
        <a href="https://www.google.com" target="_blank" rel="noreferrer">Link to Google</a>
        
        <form>
          <label>Enter your name: </label>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>

        <img 
          src="https://via.placeholder.com/150" 
          alt="Placeholder" 
        />

        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;