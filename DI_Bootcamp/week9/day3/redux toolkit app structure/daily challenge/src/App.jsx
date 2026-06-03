import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Calendar from './components/Calender';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const AppContent = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Daily Planner</h1>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <AddTask selectedDate={selectedDate} />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;