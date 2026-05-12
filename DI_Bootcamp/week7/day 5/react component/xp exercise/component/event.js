import React, { useState } from 'react';

function Events() {
  // Part III: State for toggle button
  const [isToggleOn, setIsToggleOn] = useState(true);

  // Part I: Click alert
  const clickMe = () => {
    alert('I was clicked');
  };

  // Part II: Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    }
  };

  // Part III: Toggle function
  const toggleState = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h3>Exercise 2: Events</h3>
      
      {/* Part I */}
      <button onClick={clickMe}>Click Me</button>
      <br /><br />

      {/* Part II */}
      <input 
        type="text" 
        onKeyDown={handleKeyDown} 
        placeholder="Type and press Enter" 
      />
      <br /><br />

      {/* Part III */}
      <button onClick={toggleState}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export default Events;