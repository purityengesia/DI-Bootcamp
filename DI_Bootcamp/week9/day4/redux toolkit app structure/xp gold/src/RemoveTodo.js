import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo } from './todoSlice';

const RemoveTodo = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(removeTodo(id))}>
      Remove
    </button>
  );
};

export default RemoveTodo;