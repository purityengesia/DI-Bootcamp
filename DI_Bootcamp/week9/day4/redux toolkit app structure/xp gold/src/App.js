import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './todoSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Redux Todo List</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => dispatch(fetchTodos())}>
          Fetch Todos from API
        </button>
      </div>

      <AddTodo />
      <TodoList />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;