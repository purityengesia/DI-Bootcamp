import React from 'react';
import { TaskProvider } from './TaskContext';
import AddTask from './AddTask';
import TaskList from './TaskList';

function App() {
  return (
    // Wrap the entire app in the Provider so children can access state
    <TaskProvider>
      <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;