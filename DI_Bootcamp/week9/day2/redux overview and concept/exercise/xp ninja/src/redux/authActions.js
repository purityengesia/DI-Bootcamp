import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT, 
  REGISTER_SUCCESS 
} from './authActiontypes';

// --- Mock API Helper ---
const mockAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        resolve({ 
          username: username, 
          email: `${username}@example.com`,
          token: 'fake-jwt-token-123' 
        });
      } else {
        reject('Invalid credentials');
      }
    }, 1000); // Simulate 1 second network delay
  });
};

// --- Action Creators ---

export const login = (username, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    mockAuthApi(username, password)
      .then((user) => {
        // Save to local storage for persistence
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: error.toString(),
        });
      });
  };
};

export const logout = () => {
  localStorage.removeItem('user');
  return { type: LOGOUT };
};

export const register = (username, password) => {
  return (dispatch) => {
    // For this mock, registration is just an immediate login
    mockAuthApi(username, password)
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: error.toString(),
        });
      });
  };
};