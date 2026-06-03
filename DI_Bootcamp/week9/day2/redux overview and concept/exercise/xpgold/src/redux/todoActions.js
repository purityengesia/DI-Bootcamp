import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes';

export const addTodo = (text, category) => {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text,
      category,
      completed: false,
    },
    meta: { category },
  };
};

export const toggleTodo = (id, category) => {
  return {
    type: TOGGLE_TODO,
    payload: id,
    meta: { category },
  };
};

export const deleteTodo = (id, category) => {
  return {
    type: DELETE_TODO,
    payload: id,
    meta: { category },
  };
};
