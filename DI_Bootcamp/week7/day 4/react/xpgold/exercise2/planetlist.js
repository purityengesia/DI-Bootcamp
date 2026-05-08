// src/PlanetList.js
import React from 'react';

function PlanetList() {
  const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

  return (
    <ul className="list-group">
      {planets.map((planet, index) => (
        // We use index as a key, and apply the list-group-item class
        <li key={index} className="list-group-item">
          {planet}
        </li>
      ))}
    </ul>
  );
}

export default PlanetList;