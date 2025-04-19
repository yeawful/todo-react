import Task from '../task/task';

import './task-list.css';

function TaskList({ tasks, onToggle, onDelete}) {
  if (tasks.length === 0) {
    return null;
  }

  const taskData = tasks.map((task) => (
    <li key={task.id} className={task.completed ? 'completed' : ''}>
      <Task task={task} onToggle={onToggle} onDelete={onDelete} />
    </li>
  ));

  return (
    <ul className="todo-list">
      {taskData}
    </ul>
  );
}

export default TaskList;