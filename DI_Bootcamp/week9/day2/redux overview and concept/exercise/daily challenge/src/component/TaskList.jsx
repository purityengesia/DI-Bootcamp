import React from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, selectedDate }) => {
  // Safely get tasks for the selected day, defaulting to empty array
  const daysTasks = tasks[selectedDate] || [];

  return (
    <div>
      <h3>Tasks for {selectedDate}</h3>
      {daysTasks.length === 0 ? (
        <p>No tasks for this day.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {daysTasks.map((task) => (
            <TaskItem key={task.id} task={task} date={selectedDate} />
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.planner.tasks,
  selectedDate: state.planner.selectedDate,
});

export default connect(mapStateToProps)(TaskList);