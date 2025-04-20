import Task from '../task/task';
import PropTypes from 'prop-types';

import './task-list.css';

function TaskList({ tasks, onToggle, onDelete, onUpdate, onStartTimer, onPauseTimer, onResetTimer}) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
          onResetTimer={onResetTimer}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onResetTimer: PropTypes.func.isRequired,
};

export default TaskList;