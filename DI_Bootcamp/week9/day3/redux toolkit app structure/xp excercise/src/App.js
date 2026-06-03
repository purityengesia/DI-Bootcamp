import { Provider } from 'react-redux';
import { store } from './store';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <h1>Redux Toolkit Todo App</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;