import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}
    >
      Logout
    </button>
  );
};

export default Logout;