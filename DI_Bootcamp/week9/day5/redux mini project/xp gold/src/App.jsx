// src/App.jsx
import { Provider } from 'react-redux';
import { store } from './store';
import ShoppingCart from './ShoppingCart';

export default function App() {
  return (
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );
}