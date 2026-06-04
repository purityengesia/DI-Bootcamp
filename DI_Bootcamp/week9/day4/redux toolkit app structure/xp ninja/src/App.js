import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthForm from './components/AuthForm';
import ProductListing from './components/ProductListing';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <AuthForm />
        <ProductListing />
        <ShoppingCart />
      </div>
    </Provider>
  );
}

export default App;