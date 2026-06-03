import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '../features/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a successful login
    dispatch(loginUser());
    dispatch(setUser({ name: username }));
    setUsername('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;