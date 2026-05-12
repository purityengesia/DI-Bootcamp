// src/App.js
import React from 'react';
import BookForm from './Components/BookForm';
import UserForm from './Components/UserForm';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>React Form Exercises</h1>
      
      {/* Exercise 1 */}
      <BookForm />
      
      <br />
      
      {/* Exercise 2 */}
      <UserForm />
      
    </div>
  );
}

export default App;