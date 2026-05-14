import React, { createContext, useContext, useReducer } from 'react';

// 1. Create the Context
const TaskContext = createContext();

// 2. Define Initial State
const initialState = [];

// 3. Define the Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
};

// 4. Create the Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// 5. Create a custom hook for easy access (Optional but recommended)
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};