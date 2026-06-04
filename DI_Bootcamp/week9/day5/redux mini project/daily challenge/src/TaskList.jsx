// src/TaskList.jsx
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, deleteTask, updateTaskProgress } from './productivitySlice';
import { selectTasksByCategory, selectCategoryById } from './productivitySelectors';
import { selectProductivityState } from './productivitySlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 1. Get current filter from state
  const { selectedCategoryId } = useSelector(selectProductivityState);

  // 2. Fetch tasks using the specific selector
  const tasks = useSelector((state) => selectTasksByCategory(state, selectedCategoryId));

  // 3. Fetch category name HERE (at the top), not inside the JSX return
  const categoryName = useSelector((state) => 
    selectCategoryById(state, selectedCategoryId)?.name
  );

  // Handlers wrapped in useCallback for efficiency
  const handleToggleStatus = useCallback(
    (id) => {
      dispatch(updateTaskProgress(id));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleEditClick = useCallback((task) => {
    setEditingId(task.id);
    setEditText(task.title);
  }, []);

  const handleSaveEdit = useCallback(
    (id) => {
      dispatch(editTask({ id, title: editText }));
      setEditingId(null);
    },
    [editText, dispatch]
  );

  return (
    <div style={styles.container}>
      <h2>
        Tasks{' '}
        {selectedCategoryId !== 'All' && (
          <span style={styles.categoryBadge}>
            {/* Now we just use the variable 'categoryName' here */}
            {categoryName}
          </span>
        )}
      </h2>
      
      {tasks.length === 0 ? (
        <p style={styles.empty}>No tasks found for this category.</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.item}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleStatus(task.id)}
                style={styles.checkbox}
              />
              
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleSaveEdit(task.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                  autoFocus
                  style={styles.editInput}
                />
              ) : (
                <span
                  onClick={() => handleEditClick(task)}
                  style={{
                    ...styles.text,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#aaa' : '#333',
                  }}
                >
                  {task.title}
                </span>
              )}

              <button
                onClick={() => handleDelete(task.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px' },
  categoryBadge: { fontSize: '0.8em', color: '#666', fontWeight: 'normal' },
  empty: { textAlign: 'center', color: '#888', fontStyle: 'italic' },
  list: { listStyle: 'none', padding: 0 },
  item: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    gap: '10px',
  },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer' },
  text: { flex: 1, cursor: 'pointer', fontSize: '16px' },
  editInput: { flex: 1, padding: '5px', fontSize: '16px' },
  deleteBtn: {
    padding: '5px 10px',
    background: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskList;