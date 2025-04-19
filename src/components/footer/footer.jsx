import TaskFilter from '../tasks-filter/tasks-filter'

import './footer.css';

function Footer({ tasks, currentFilter, onFilterChange, onClearCompleted }) {
  const activeTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
      <TaskFilter 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange}
      />
      <button 
        className="clear-completed"
        onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;