import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = ({ selectedDate }) => {
  // Access tasks specifically for the selectedDate
  const tasks = useSelector((state) => state.tasks.tasksByDate[selectedDate] || []);

  return (
    <div>
      <h3>Tasks for {selectedDate}</h3>
      {tasks.length === 0 ? (
        <p>No tasks for this day.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} date={selectedDate} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;