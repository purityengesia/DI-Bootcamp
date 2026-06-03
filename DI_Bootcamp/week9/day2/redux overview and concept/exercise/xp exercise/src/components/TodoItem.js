import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/todoActions';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          marginRight: '10px',
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
