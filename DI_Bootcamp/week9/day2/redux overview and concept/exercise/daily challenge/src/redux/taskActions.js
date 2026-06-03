import { ADD_TASK, EDIT_TASK, DELETE_TASK, SET_DATE } from './taskActionTypes';

export const addTask = (date, text) => {
  return {
    type: ADD_TASK,
    payload: {
      date,
      task: {
        id: Date.now(),
        text,
        completed: false,
      },
    },
  };
};

export const editTask = (date, id, newText) => {
  return {
    type: EDIT_TASK,
    payload: { date, id, newText },
  };
};

export const deleteTask = (date, id) => {
  return {
    type: DELETE_TASK,
    payload: { date, id },
  };
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};