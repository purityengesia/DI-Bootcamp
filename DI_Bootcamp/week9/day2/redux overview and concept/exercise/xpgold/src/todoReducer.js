import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes';

// 1. Update Initial State to be an Object with Categories
const initialState = {
  "Personal": [],
  "Work": [],
  "Shopping": [],
  // You can add more default categories here
};

const todoReducer = (state = initialState, action) => {
  // Extract the category from action.meta
  const category = action.meta?.category;

  switch (action.type) {
    case ADD_TODO:
      // Safety check: if category doesn't exist, don't crash
      if (!state[category]) return state;
      
      return {
        ...state,
        // Update ONLY the specific category's array
        [category]: [...state[category], action.payload],
      };

    case TOGGLE_TODO:
      if (!state[category]) return state;

      return {
        ...state,
        [category]: state[category].map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };

    case DELETE_TODO:
      if (!state[category]) return state;

      return {
        ...state,
        [category]: state[category].filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;