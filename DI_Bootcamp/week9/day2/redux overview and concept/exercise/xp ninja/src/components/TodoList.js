// ... imports remain the same

const mapStateToProps = (state) => {
  return {
    // CHANGED: state -> state.todos
    todos: state.todos, 
  };
};

export default connect(mapStateToProps)(TodoList);