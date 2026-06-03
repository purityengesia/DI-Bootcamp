import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/taskSlice';

const AddTask = ({ selectedDate }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedDate) return;
    dispatch(addTask({ date: selectedDate, text }));
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
        Add
      </button>
    </form>
  );
};

export default AddTask;