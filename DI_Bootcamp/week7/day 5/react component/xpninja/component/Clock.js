import React, { useState, useEffect } from 'react';

function Clock() {
  // State variable to store the current time
  const [currentDate, setDate] = useState(new Date());

  // Function to update the state
  const tick = () => {
    setDate(new Date());
  };

  useEffect(() => {
    // Set the interval to call tick() every 1000ms (1 second)
    const timerID = setInterval(() => tick(), 1000);

    // Cleanup function: Clears the interval when the component unmounts
    return () => clearInterval(timerID);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h3>Exercise 1: Live Clock</h3>
      <h2>It is {currentDate.toLocaleTimeString()}.</h2>
    </div>
  );
}

export default Clock;