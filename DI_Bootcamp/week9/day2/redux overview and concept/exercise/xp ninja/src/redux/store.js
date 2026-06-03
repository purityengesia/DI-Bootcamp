import { createStore, combineReducers } from 'redux'; // Import combineReducers
import todoReducer from './todoReducer';
import authReducer from './auth/authReducer';

// Combine the reducers
const rootReducer = combineReducers({
  todos: todoReducer, // The state for todos will now be at state.todos
  auth: authReducer   // The state for auth will be at state.auth
});

const store = createStore(rootReducer);

export default store;                                        