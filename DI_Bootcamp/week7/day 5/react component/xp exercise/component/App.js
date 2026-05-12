import React from 'react';
import Car from './Components/Car';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';

function App() {
  // Part I: Exercise 1 Object
  const carinfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>React Exercises</h1>
      
      {/* Exercise 1 */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <h3>Exercise 1: Car</h3>
        <Car carInfo={carinfo} />
      </div>

      {/* Exercise 2 */}
      <Events />

      {/* Exercise 3 */}
      <Phone />

      {/* Exercise 4 */}
      <Color />
      
    </div>
  );
}

export default App;