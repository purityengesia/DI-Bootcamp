import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import UserData from './UserData';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Thunk Exercise</h1>
        <UserData />
      </div>
    </Provider>
  );
}

export default App;