import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/todoActions';

const TodoItem = ({ todo, category, toggleTodo, deleteTodo }) => {
  return (
    <div style={{ margin: '5px 0', borderBottom: '1px solid #eee' }}>
      <span
        onClick={() => toggleTodo(todo.id, category)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id, category)}>Delete</button>
    </div>
  );
};

// We still mapDispatchToProps, but now the functions need to accept ID AND Category
const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id, category) => dispatch(toggleTodo(id, category)),
    deleteTodo: (id, category) => dispatch(deleteTodo(id, category)),
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);