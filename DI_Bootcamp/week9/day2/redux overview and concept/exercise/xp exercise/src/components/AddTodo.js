import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/todoActions';

const AddTodo = ({ dispatch }) => {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        style={{ marginRight: '10px', padding: '6px' }}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default connect()(AddTodo);
