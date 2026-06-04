// src/App.jsx
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './productivitySlice';
import { selectProductivityState } from './productivitySlice';
import { selectCompletedTasks } from './productivitySelectors';
import CategorySelector from './CategorySelector';
import TaskList from './TaskList';

// Inner App Component to access hooks
const AppContent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectProductivityState);
  const completedCount = useSelector(selectCompletedTasks);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle && newTaskCategory) {
      dispatch(addTask({ title: newTaskTitle, categoryId: newTaskCategory }));
      setNewTaskTitle('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#f4f4f9', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Productivity Tracker</h1>
        <p>Completed Tasks: <strong>{completedCount}</strong></p>
      </header>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={styles.input}
        />
        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button onClick={handleAddTask} style={styles.button}>Add Task</button>
      </div>

      <CategorySelector />
      <TaskList />
    </div>
  );
};

const styles = {
  inputContainer: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flex: 1, minWidth: '200px' },
  select: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd' },
  button: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}