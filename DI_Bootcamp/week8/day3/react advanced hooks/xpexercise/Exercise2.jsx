import { useState, useRef } from 'react';

const CharacterCounter = () => {
  // 1. Create a ref for the input element
  const inputRef = useRef(null);
  
  // 2. State to hold the character count (triggers re-render)
  const [count, setCount] = useState(0);

  // 3. Event handler to track changes
  const handleInputChange = () => {
    // Access the current value of the DOM element via the ref
    const textLength = inputRef.current.value.length;
    setCount(textLength);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Character Counter</h2>
      
      {/* Attach the ref to the input */}
      <input
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        placeholder="Type something here..."
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      
      <div style={{ marginTop: '10px', fontSize: '18px', color: '#555' }}>
        Character Count: <strong>{count}</strong>
      </div>
    </div>
  );
};

export default CharacterCounter;
