import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from './TaskContext';

const TaskList = () => {
  const { state, dispatch } = useTasks();
  const { tasks, filter } = state;
  
  // Local state to track which task is currently being edited
  const [editingId, setEditingId] = useState(null);
  
  // Create a ref for the input field to handle focus
  const editInputRef = useRef(null);

  // Focus the input automatically when editing starts
  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  // Derived state: Filter tasks based on the current filter selection
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'COMPLETED') return task.completed;
    if (filter === 'ACTIVE') return !task.completed;
    return true; // 'ALL'
  });

  // Handler to save the edited task
  const handleSaveEdit = (id, newText) => {
    if (newText.trim() !== '') {
      dispatch({ 
        type: 'EDIT_TASK', 
        payload: { id, newText } 
      });
    }
    setEditingId(null); // Exit edit mode
  };

  // Handle Enter key in input
  const handleKeyDown = (e, id, text) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id, text);
    } else if (e.key === 'Escape') {
      setEditingId(null); // Cancel edit
    }
  };

  return (
    <div>
      {/* --- Filter Controls --- */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ALL' })}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'ALL' ? '#007bff' : '#e0e0e0',
            color: filter === 'ALL' ? '#fff' : '#000',
          }}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ACTIVE' })}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'ACTIVE' ? '#007bff' : '#e0e0e0',
            color: filter === 'ACTIVE' ? '#fff' : '#000',
          }}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'COMPLETED' })}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'COMPLETED' ? '#007bff' : '#e0e0e0',
            color: filter === 'COMPLETED' ? '#fff' : '#000',
          }}
        >
          Completed
        </button>
      </div>

      {/* --- Task List --- */}
      <ul style={styles.list}>
        {filteredTasks.length === 0 && <p style={styles.empty}>No tasks found.</p>}
        
        {filteredTasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
              style={{ marginRight: '10px' }}
            />

            {/* Conditional Rendering: Edit Mode vs View Mode */}
            {editingId === task.id ? (
              <input
                ref={editInputRef} // Attach the ref here
                type="text"
                defaultValue={task.text}
                onBlur={(e) => handleSaveEdit(task.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, task.id, e.target.value)}
                style={styles.editInput}
              />
            ) : (
              <span
                style={{
                  ...styles.text,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => setEditingId(task.id)} // Click text to edit
                title="Click to edit"
              >
                {task.text}
              </span>
            )}

            {editingId !== task.id && (
               <button 
               onClick={() => setEditingId(task.id)}
               style={{...styles.actionBtn, marginLeft: '10px'}}
             >
               Edit
             </button>
            )}

            <button
              onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}
              style={{ ...styles.actionBtn, marginLeft: '10px', backgroundColor: '#ff4d4d' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    background: '#f9f9f9',
  },
  text: {
    flexGrow: 1,
  },
  editInput: {
    flexGrow: 1,
    padding: '5px',
    fontSize: '16px',
  },
  filterBtn: {
    padding: '5px 15px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  actionBtn: {
    padding: '4px 8px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ddd',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
  }
};

export default TaskList;