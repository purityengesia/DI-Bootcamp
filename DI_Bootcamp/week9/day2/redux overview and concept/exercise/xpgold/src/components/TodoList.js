import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <div>
      {/* Map over each category name in the state object */}
      {Object.keys(todos).map((category) => (
        <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{category}</h3>
          
          {/* If category has no todos, show message */}
          {todos[category].length === 0 && <p>No todos in this category.</p>}

          {/* Map over the todos inside this specific category */}
          {todos[category].map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              category={category} // Pass category down so TodoItem knows what to dispatch
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state, 
  };
};

export default connect(mapStateToProps)(TodoList);