import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!input.trim()) return;
    
    // Create a new todo object
    const newTodo = {
      id: Date.now(), // Simple ID generation
      title: input,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setInput('');
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new todo" 
      />
      <button onClick={handleAdd}>Add Todo</button>
    </div>
  );
};

export default AddTodo;