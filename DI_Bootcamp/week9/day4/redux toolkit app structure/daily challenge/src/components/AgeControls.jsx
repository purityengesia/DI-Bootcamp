import { useDispatch } from 'react-redux';
import { ageUpAsync, ageDownAsync } from '../features/ageSlice';

const AgeControls = () => {
  const dispatch = useDispatch();

  return (
    <div style={styles.buttonContainer}>
      <button 
        onClick={() => dispatch(ageUpAsync())}
        style={{ ...styles.button, backgroundColor: '#4CAF50' }}
      >
        Age Up
      </button>
      
      <button 
        onClick={() => dispatch(ageDownAsync())}
        style={{ ...styles.button, backgroundColor: '#f44336' }}
      >
        Age Down
      </button>
    </div>
  );
};

const styles = {
  buttonContainer: { display: 'flex', justifyContent: 'center', gap: '20px' },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AgeControls;