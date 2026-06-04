import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo } from './todoSlice';

const ToggleTodo = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTodo(id))}>
      Toggle Completed
    </button>
  );
};

export default ToggleTodo;