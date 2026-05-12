// src/App.js
import React from 'react';
import Clock from './Components/Clock';
import Form from './Components/FormValidation';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>React Exercises</h1>
      
      {/* Exercise 1 */}
      <Clock />
      
      <br />
      
      {/* Exercise 2 */}
      <Form />
      
    </div>
  );
}

export default App;