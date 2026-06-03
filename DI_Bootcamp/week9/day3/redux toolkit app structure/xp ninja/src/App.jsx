import { Provider } from 'react-redux';
import { store } from './store';
import AddProduct from './components/AddProduct';
import InventoryList from './components/InventoryList';

function App() {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: '800px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
        <h1>Store Inventory Management</h1>
        <AddProduct />
        <InventoryList />
      </div>
    </Provider>
  );
}

export default App;