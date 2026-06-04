import { Provider } from 'react-redux';
import { store } from './store';
import AgeDisplay from './components/AgeDisplay.jsx';
import AgeControls from './components/AgeControls.jsx';

function App() {
  return (
    // Step 5: Wrap app in Provider
    <Provider store={store}>
      <div className="App">
        <AgeDisplay />
        <AgeControls />
      </div>
    </Provider>
  );
}

export default App;