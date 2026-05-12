import React, { useState } from 'react';
import Garage from './Garage';

function Car(props) {
  // Part II: useState Hook for color
  const [color, setColor] = useState("red");

  return (
    <div>
      {/* Added ?. to safely access model even if props.carInfo is missing */}
      <h2>This car is {color} {props.carInfo?.model}</h2>
      
      {/* Button to change color */}
      <button onClick={() => setColor("blue")}>Change Color</button>
      
      {/* Part III: Garage Component */}
      <Garage size="small" />
    </div>
  );
}

export default Car;