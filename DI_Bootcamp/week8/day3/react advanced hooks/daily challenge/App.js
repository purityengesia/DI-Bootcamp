import React from 'react';
import { TaskProvider } from './TaskContext';
import AddTask from './AddTask'; // Assuming this remains the same as previous exercise
import TaskList from './TaskList';

function App() {
  return (
    <TaskProvider>
      <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
        <h1>Enhanced Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;