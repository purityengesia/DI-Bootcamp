import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../redux/taskActions';

const AddTask = ({ selectedDate, addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(selectedDate, text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.planner.selectedDate,
});

export default connect(mapStateToProps, { addTask })(AddTask);