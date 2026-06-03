import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTask, deleteTask } from '../redux/taskActions';

const TaskItem = ({ task, date, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    editTask(date, task.id, editText);
    setIsEditing(false);
  };

  return (
    <li style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px', 
      borderBottom: '1px solid #eee' 
    }}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
            {task.text}
          </span>
          <div>
            <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => deleteTask(date, task.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

// We don't need mapStateToProps here, just the dispatch functions
const mapDispatchToProps = (dispatch) => ({
  editTask: (date, id, text) => dispatch(editTask(date, id, text)),
  deleteTask: (date, id) => dispatch(deleteTask(date, id)),
});

export default connect(null, mapDispatchToProps)(TaskItem);