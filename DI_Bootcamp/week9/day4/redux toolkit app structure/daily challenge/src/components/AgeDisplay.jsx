import { useSelector } from 'react-redux';

const AgeDisplay = () => {
  // Access age and loading state from Redux
  const { age, loading } = useSelector((state) => state.age);

  // Simple CSS for the spinner
  const spinnerStyle = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    marginLeft: '10px',
    verticalAlign: 'middle',
  };

  return (
    <div style={styles.container}>
      <h2>Age Tracker</h2>
      <div style={styles.ageBox}>
        <span>Current Age: </span>
        <strong style={styles.ageText}>{age}</strong>
        
        {/* Show loading icon if loading is true */}
        {loading && <div style={spinnerStyle}></div>}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  ageBox: { fontSize: '24px', margin: '20px 0' },
  ageText: { fontSize: '40px', color: '#333' },
};

// Add keyframes for spin animation globally or via style tag if preferred, 
// but for simplicity here it relies on CSS support.
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AgeDisplay;