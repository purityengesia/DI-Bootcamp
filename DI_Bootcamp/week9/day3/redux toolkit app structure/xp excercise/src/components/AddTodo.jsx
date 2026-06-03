import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    // Prevent adding empty todos
    if (!input.trim()) return;
    
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;