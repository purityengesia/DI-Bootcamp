import React, { useState, useEffect } from 'react';

function Color() {
  // State variable
  const [favoriteColor, setFavoriteColor] = useState("red");

  // Function to change color
  const changeColor = () => {
    setFavoriteColor("blue");
  };

  // useEffect hook
  useEffect(() => {
    alert("useEffect reached");
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h3>Exercise 4: useEffect</h3>
      <h1>My favorite color is {favoriteColor}</h1>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Color;