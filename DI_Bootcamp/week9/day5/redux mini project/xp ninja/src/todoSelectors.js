// src/todoSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Input selector to get the whole todo slice
const selectTodoState = (state) => state.todos;

// 1. Returns the list of todos based on the visibility filter
export const selectTodos = createSelector(
  [selectTodoState],
  (todoState) => {
    const { items, filter } = todoState;
    
    switch (filter) {
      case 'Active':
        return items.filter((item) => !item.completed);
      case 'Completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }
);

// 2. Returns the current visibility filter value
export const selectVisibilityFilter = createSelector(
  [selectTodoState],
  (todoState) => todoState.filter
);

// 3. Computes the count of todos based on the visibility filter
export const selectFilteredTodosCount = createSelector(
  [selectTodos], // Input is the output of selectTodos
  (filteredTodos) => filteredTodos.length
);