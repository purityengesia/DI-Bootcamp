import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  // State to hold the two inputs, the selected operation, and the result
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Convert string inputs to numbers (floating point for decimals)
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    // Validation: Check if inputs are actual numbers
    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let res;

    // Perform calculation based on the selected operation
    switch (operation) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        // Handle division by zero
        if (num2 === 0) {
          setResult('Cannot divide by zero');
          return;
        }
        res = num1 / num2;
        break;
      default:
        res = 0;
    }

    // Update the result state
    setResult(res);
  };

  return (
    <div className="calculator-container">
      <h1>React Calculator</h1>
      
      <div className="calculator-body">
        <div className="input-group">
          <input
            type="number"
            placeholder="0"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
          />
        </div>

        {/* Bonus: Select Dropdown for Operations */}
        <div className="select-group">
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="0"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
          />
        </div>
      </div>

      {/* The button requested in instructions */}
      <button className="calc-btn" onClick={handleCalculate}>
        Calculate
      </button>

      {/* Display the result */}
      {result !== null && (
        <div className="result-display">
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default Calculator; 