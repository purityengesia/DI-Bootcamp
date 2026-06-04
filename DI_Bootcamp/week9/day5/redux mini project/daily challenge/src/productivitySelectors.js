// src/productivitySelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Input selectors
// const selectProductivityState = (state) => state.productivity; // REMOVED (Unused)
const selectTasks = (state) => state.productivity.tasks;
const selectCategories = (state) => state.productivity.categories;

// 1. selectTasksByCategory: Returns tasks belonging to a specific category.
export const selectTasksByCategory = createSelector(
  [selectTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) => {
    if (categoryId === 'All') return tasks;
    return tasks.filter((task) => task.categoryId === categoryId);
  }
);

// 2. selectCompletedTasks: Computes the count of completed tasks.
export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed).length
);

// 3. selectCategoryById: Returns category details based on ID.
export const selectCategoryById = createSelector(
  [selectCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => categories.find((cat) => cat.id === categoryId)
);