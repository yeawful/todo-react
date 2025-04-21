import Task from '../task/task';
import PropTypes from 'prop-types';

import './task-list.css';

function TaskList({ tasks, onToggle, onDelete, onUpdate, onToggleTimer }) {

  // Проверка на пустой список задач
  if (tasks.length === 0) {
    return null;
  }


  // Рендер
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
          onToggleTimer={onToggleTimer}
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
  onToggleTimer: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;