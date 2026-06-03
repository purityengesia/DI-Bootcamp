
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  // Select the todos array from the Redux state
  const todos = useSelector((state) => state.todos);

  return (
    <div>
      <h2>Todo List</h2>
      <ul style={{ padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos.length === 0 && <p>No todos yet!</p>}
    </div>
  );
};

export default TodoList;