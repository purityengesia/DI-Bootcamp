import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
      <h1>Redux Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
