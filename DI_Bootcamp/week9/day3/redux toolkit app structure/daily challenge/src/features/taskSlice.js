import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // State structure: { "YYYY-MM-DD": [ { id, text, completed }, ... ] }
  tasksByDate: {},
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = [];
      }
      state.tasksByDate[date].push({
        id: Date.now(),
        text,
        completed: false,
      });
    },
    editTask: (state, action) => {
      const { date, id, newText } = action.payload;
      const tasks = state.tasksByDate[date];
      if (tasks) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          task.text = newText;
        }
      }
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      if (state.tasksByDate[date]) {
        state.tasksByDate[date] = state.tasksByDate[date].filter(
          (t) => t.id !== id
        );
      }
    },
    toggleComplete: (state, action) => {
      const { date, id } = action.payload;
      const tasks = state.tasksByDate[date];
      if (tasks) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleComplete } = taskSlice.actions;
export default taskSlice.reducer;