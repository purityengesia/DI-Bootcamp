import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes';

// 1. Update addTodo to accept category
export const addTodo = (text, category) => {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text: text,
      category: category, // Store category in the todo item (optional, but good for tracking)
      completed: false,
    },
    meta: { category } // We use 'meta' to tell the reducer WHICH category list to update
  };
};

// 2. Update toggleTodo to accept category
export const toggleTodo = (id, category) => {
  return {
    type: TOGGLE_TODO,
    payload: id,
    meta: { category }
  };
};

// 3. Update deleteTodo to accept category
export const deleteTodo = (id, category) => {
  return {
    type: DELETE_TODO,
    payload: id,
    meta: { category }
  };
};