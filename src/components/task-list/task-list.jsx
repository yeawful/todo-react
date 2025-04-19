import Task from '../task/task';
import PropTypes from 'prop-types';

import './task-list.css';

function TaskList({ tasks, onToggle, onDelete, onUpdate}) {
  if (tasks.length === 0) {
    return null;
  }

  const taskData = tasks.map((task) => (
    <li key={task.id}>
      <Task 
        task={task} 
        onToggle={onToggle} 
        onDelete={onDelete} 
        onUpdate={onUpdate}
        />
    </li>
  ));

  return (
    <ul className="todo-list">
      {taskData}
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
};

TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;