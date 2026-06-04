import React from 'react';
import { useSelector } from 'react-redux';
import ToggleTodo from './ToggleTodo';
import RemoveTodo from './RemoveTodo';

const TodoList = () => {
  // Select todos from the Redux store
  const todos = useSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ margin: '10px 0', textDecoration: todo.completed ? 'line-through' : 'none' }}>
          <span>{todo.title}</span>
          {/* Use the specific components for toggling and removing */}
          <ToggleTodo id={todo.id} />
          <RemoveTodo id={todo.id} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;