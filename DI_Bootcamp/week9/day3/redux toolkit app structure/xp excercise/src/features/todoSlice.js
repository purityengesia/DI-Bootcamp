import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Optional: Pre-populate with one item for testing
  { id: 1, text: 'Learn Redux Toolkit', completed: false },
];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(), // Simple ID generation
        text: action.payload,
        completed: false,
      };
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      state.push(todo);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      // Return a new array excluding the todo with the specified ID
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

// Export actions to be used in our components
export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

// Export the reducer to be added to the store
export default todoSlice.reducer;