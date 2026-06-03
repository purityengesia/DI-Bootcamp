import { createStore, combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  planner: taskReducer,
});

// Load tasks from LocalStorage for initial state
const persistedState = localStorage.getItem('plannerTasks')
  ? {
      planner: {
        selectedDate: new Date().toISOString().split('T')[0],
        tasks: JSON.parse(localStorage.getItem('plannerTasks')),
      },
    }
  : undefined;

const store = createStore(rootReducer, persistedState);

// Subscribe to save changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('plannerTasks', JSON.stringify(state.planner.tasks));
});

export default store;