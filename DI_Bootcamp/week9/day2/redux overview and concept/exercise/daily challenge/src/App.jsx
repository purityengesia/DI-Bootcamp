import React from 'react';
import Calendar from './component/Calendar.jsx';
import AddTask from './component/AddTask.jsx';
import TaskList from './component/TaskList.jsx';

function App() {
  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Daily Planner</h1>
      <Calendar />
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;