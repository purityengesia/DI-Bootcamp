// src/UserFavoriteAnimals.js
import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    // Destructure favAnimals from props
    const { favAnimals } = this.props;

    return (
      <ul>
        {favAnimals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    );
  }
}

export default UserFavoriteAnimals;