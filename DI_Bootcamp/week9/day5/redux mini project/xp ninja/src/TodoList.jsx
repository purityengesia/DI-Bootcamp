// src/TodoList.jsx
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
} from './todoSlice';
import {
  selectTodos,
  selectVisibilityFilter,
  selectFilteredTodosCount,
} from './todoSelectors';

const TodoList = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  // Selectors
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectVisibilityFilter);
  const count = useSelector(selectFilteredTodosCount);

  // Efficient handlers with useCallback
  const handleAddTodo = useCallback(() => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  }, [inputValue, dispatch]);

  const handleToggle = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const handleSetFilter = useCallback(
    (newFilter) => {
      dispatch(setFilter(newFilter));
    },
    [dispatch]
  );

  return (
    <div style={styles.container}>
      <h1>📝 Todo List</h1>

      {/* Input Section */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filters}>
        {['All', 'Active', 'Completed'].map((f) => (
          <button
            key={f}
            onClick={() => handleSetFilter(f)}
            style={filter === f ? styles.activeFilter : styles.filter}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              style={styles.checkbox}
            />
            <span
              style={{
                ...styles.text,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#333',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleRemove(todo.id)}
              style={styles.deleteButton}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Count Display */}
      <div style={styles.countInfo}>
        Total visible items: <strong>{count}</strong>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
  inputGroup: { display: 'flex', marginBottom: '20px', gap: '10px' },
  input: { flex: 1, padding: '8px', fontSize: '16px' },
  addButton: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px' },
  filter: { padding: '6px 12px', cursor: 'pointer', border: '1px solid #ccc', background: '#fff', borderRadius: '4px' },
  activeFilter: { padding: '6px 12px', cursor: 'pointer', border: '1px solid #007bff', background: '#007bff', color: 'white', borderRadius: '4px' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', gap: '10px' },
  checkbox: { cursor: 'pointer', width: '18px', height: '18px' },
  text: { flex: 1, fontSize: '18px' },
  deleteButton: { background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' },
  countInfo: { marginTop: '20px', textAlign: 'right', color: '#666' }
};

export default TodoList;