import React, { useState } from 'react';
import { useTasks } from './TaskContext';

const AddTask = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: '8px', width: '60%' }}
      />
      <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Add Task
      </button>
    </form>
  );
};

export default AddTask;