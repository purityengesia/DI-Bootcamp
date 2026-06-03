import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes';

const initialState = {
  Personal: [],
  Work: [],
  Shopping: [],
};

const todoReducer = (state = initialState, action) => {
  const category = action.meta?.category;

  switch (action.type) {
    case ADD_TODO:
      if (!category || !state[category]) return state;
      return {
        ...state,
        [category]: [...state[category], action.payload],
      };

    case TOGGLE_TODO:
      if (!category || !state[category]) return state;
      return {
        ...state,
        [category]: state[category].map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case DELETE_TODO:
      if (!category || !state[category]) return state;
      return {
        ...state,
        [category]: state[category].filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
