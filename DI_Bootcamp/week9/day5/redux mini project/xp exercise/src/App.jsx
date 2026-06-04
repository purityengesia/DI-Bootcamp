// App.jsx
import { Provider } from 'react-redux';
import { store } from './store';
import BookList from './BookList';

export default function App() {
  // The variables above are "used" here in the return statement.
  // If this block is missing, you will get the "no-unused-var" error.
  return (
    <Provider store={store}>
      <BookList />
    </Provider>
  );
}