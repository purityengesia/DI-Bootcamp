import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Redux Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
