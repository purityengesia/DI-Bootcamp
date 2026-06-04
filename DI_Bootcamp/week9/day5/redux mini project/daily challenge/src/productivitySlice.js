// src/productivitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, title: 'Write Project Proposal', categoryId: 1, completed: false },
    { id: 2, title: 'Weekly Team Meeting', categoryId: 2, completed: true },
    { id: 3, title: 'Code Review', categoryId: 1, completed: false },
  ],
  categories: [
    { id: 1, name: 'Work', color: '#3498db' },
    { id: 2, name: 'Personal', color: '#e74c3c' },
    { id: 3, name: 'Learning', color: '#2ecc71' },
  ],
  selectedCategoryId: 'All',
};

export const productivitySlice = createSlice({
  name: 'productivity',
  initialState,
  reducers: {
    // ... your existing reducers (addTask, editTask, etc.) ...
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload.title,
        categoryId: parseInt(action.payload.categoryId),
        completed: false,
      });
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTaskProgress: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now(),
        name: action.payload.name,
        color: action.payload.color || '#333',
      });
    },
    editCategory: (state, action) => {
      const category = state.categories.find((c) => c.id === action.payload.id);
      if (category) category.name = action.payload.name;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
      if (state.selectedCategoryId === action.payload) {
        state.selectedCategoryId = 'All';
      }
    },
    setCategoryFilter: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, updateTaskProgress, addCategory, editCategory, deleteCategory, setCategoryFilter } = productivitySlice.actions;
export default productivitySlice.reducer;

// --- ADD THIS LINE BELOW ---
export const selectProductivityState = (state) => state.productivity;