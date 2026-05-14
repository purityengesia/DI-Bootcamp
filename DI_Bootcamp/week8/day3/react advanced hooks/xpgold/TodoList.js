import React, { useReducer, useState } from 'react';

// --- 1. Define the Initial State ---
const initialState = [];

// --- 2. Define the Reducer Function ---
// The reducer takes the current state and an action, then returns the new state.
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Return a new array with the existing todos plus the new one
      return [
        ...state, 
        { 
          id: Date.now(), // Simple unique ID generation
          text: action.payload 
        }
      ];

    case 'REMOVE_TODO':
      // Return a new array filtering out the todo with the matching id
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

const TodoList = () => {
  // --- 3. Initialize useReducer ---
  // todos is the current state, dispatch is the function to trigger actions
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // --- 4. Local State for Input Field ---
  const [inputValue, setInputValue] = useState('');

  // --- 5. Event Handlers ---
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      // Dispatch the ADD_TODO action with the input text as payload
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue(''); // Clear input after adding
    }
  };

  const handleRemoveTodo = (id) => {
    // Dispatch the REMOVE_TODO action with the id as payload
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <div style={styles.container}>
      <h2>Todo List (useReducer)</h2>
      
      {/* Input Section */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      {/* List Section */}
      <ul style={styles.list}>
        {todos.length === 0 && <li style={styles.emptyMessage}>No todos yet!</li>}
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span>{todo.text}</span>
            <button 
              onClick={() => handleRemoveTodo(todo.id)} 
              style={styles.deleteButton}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Simple inline styles for presentation
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '8px',
    fontSize: '16px',
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
  }
};

export default TodoList;