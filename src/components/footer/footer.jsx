import TaskFilter from '../tasks-filter/tasks-filter';
import PropTypes from 'prop-types';
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

Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  currentFilter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  tasks: [],
  currentFilter: 'All',
};

export default Footer;