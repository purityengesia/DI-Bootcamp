import React from 'react';
import { useTasks } from './TaskContext';

const TaskList = () => {
  const { tasks, dispatch } = useTasks();

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.length === 0 && <p>No tasks available.</p>}
      
      {tasks.map((task) => (
        <li 
          key={task.id} 
          style={{ 
            marginBottom: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px',
            background: '#f9f9f9',
            borderRadius: '4px'
          }}
        >
          {/* Checkbox to Toggle Completion */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
            style={{ marginRight: '10px' }}
          />

          {/* Task Text */}
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            flexGrow: 1,
            color: task.completed ? '#888' : '#000'
          }}>
            {task.text}
          </span>

          {/* Button to Remove */}
          <button
            onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}
            style={{ 
              marginLeft: '10px', 
              background: '#ff4d4d', 
              color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              cursor: 'pointer' 
            }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;