
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../features/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '10px',
      listStyle: 'none',
      background: '#f4f4f4',
      padding: '10px'
    }}>
      <span 
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{ 
          cursor: 'pointer', 
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1
        }}
      >
        {todo.text}
      </span>
      
      <button 
        onClick={() => dispatch(removeTodo(todo.id))}
        style={{ 
          marginLeft: '10px', 
          backgroundColor: '#ff4d4d', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          cursor: 'pointer' 
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;