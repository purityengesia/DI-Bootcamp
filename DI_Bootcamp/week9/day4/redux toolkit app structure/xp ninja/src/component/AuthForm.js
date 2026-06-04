import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../features/auth/authThunks';

const AuthForm = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      dispatch(loginUser(username));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUsername('');
  };

  if (isAuthenticated) {
    return (
      <div style={styles.authBox}>
        <h3>Welcome, {user.username}!</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={styles.authBox}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  authBox: { padding: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' },
  input: { marginRight: '10px', padding: '5px' },
};

export default AuthForm;