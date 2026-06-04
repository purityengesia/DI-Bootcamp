import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Reducer to add a new todo
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    // Reducer to remove a todo by ID
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    // Reducer to toggle completion status by ID
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Reducer to replace the entire list (used for fetching)
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;


// Thunk Action Creator
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    // Dispatch the setTodos action to store the fetched data
    dispatch(setTodos(data));
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};