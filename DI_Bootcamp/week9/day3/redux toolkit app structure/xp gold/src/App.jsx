import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Login';
import Logout from './components/Logout';

// Inner component to access Redux state
const AppContent = () => {
  // Access authentication state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Auth System</h1>

      {/* Conditional Rendering based on auth status */}
      {isAuthenticated ? (
        <div>
          <h3>Welcome, {user?.name}!</h3>
          <p>You are now logged in.</p>
          <Logout />
        </div>
      ) : (
        <div>
          <p>Please log in to continue.</p>
          <Login />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;