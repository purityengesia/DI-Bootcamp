import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, toggleComplete } from '../features/taskSlice';

const TaskItem = ({ task, date }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (!editText.trim()) return;
    dispatch(editTask({ date, id: task.id, newText: editText }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask({ date, id: task.id }));
    }
  };

  return (
    <li style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px', 
      borderBottom: '1px solid #eee',
      background: task.completed ? '#f0f0f0' : 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleComplete({ date, id: task.id }))}
          style={{ marginRight: '10px' }}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            autoFocus
            style={{ fontSize: '16px', padding: '5px' }}
          />
        ) : (
          <span 
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>

      <div style={{ marginLeft: '10px' }}>
        <button 
          onClick={() => setIsEditing(true)} 
          style={{ marginRight: '5px', cursor: 'pointer' }}
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 'bold' }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;