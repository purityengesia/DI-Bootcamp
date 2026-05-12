import React, { useState } from 'react';

function Phone() {
  // Part I: State variables
  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020
  });

  // Part II: Function to change color
  const changeColor = () => {
    setPhone({ ...phone, color: "blue" });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h3>Exercise 3: Phone</h3>
      <h1>My phone is a {phone.brand}</h1>
      <p>It is a {phone.color} {phone.model} from {phone.year}.</p>
      
      {/* Part II: Button to change color */}
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Phone;