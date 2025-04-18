import Task from '../task/task';

import './task-list.css';

function TaskList({ tasks }) {
  const taskData = tasks.map((task) => (
    <li key={task.id}>
      <Task task={task} />
    </li>
  ));

  return (
    <ul className="todo-list">
      {taskData}
    </ul>
  );
}

export default TaskList;