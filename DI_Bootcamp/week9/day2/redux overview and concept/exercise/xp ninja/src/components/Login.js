import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/auth/authActions';

const Login = ({ login, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
      </form>
      <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
        (Hint: Enter any username/password)
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);