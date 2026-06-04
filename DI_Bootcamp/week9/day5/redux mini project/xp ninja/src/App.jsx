// src/App.jsx
import { Provider } from 'react-redux';
import { store } from './store';
import TodoList from './TodoList';

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}