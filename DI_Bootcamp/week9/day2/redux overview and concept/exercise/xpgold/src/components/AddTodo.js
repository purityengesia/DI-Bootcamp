import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/todoActions';

const AddTodo = ({ dispatch }) => {
  const [input, setInput] = useState('');
  // Default to 'Personal' or first category
  const [category, setCategory] = useState('Personal');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Dispatch with both text and category
    dispatch(addTodo(input, category));
    setInput('');
  };

  return (
    <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      
      {/* Category Dropdown */}
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        style={{ margin: '0 10px' }}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit">Add Todo</button>
    </form>
  );
};

export default connect()(AddTodo);