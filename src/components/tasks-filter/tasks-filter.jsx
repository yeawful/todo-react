import PropTypes from 'prop-types';
import './tasks-filter.css';


// Все фильтры
const filters = ['All', 'Active', 'Completed'];

function TaskFilter({ currentFilter, onFilterChange }) {
  // Рендер
  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter}>
          <button
            type="button"
            className={currentFilter === filter ? 'selected' : ''}
            onClick={() => onFilterChange(filter)}>
            {filter}
          </button>
        </li>
      ))}
    </ul>
  );
}

TaskFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onFilterChange: PropTypes.func,
};

TaskFilter.defaultProps = {
  currentFilter: 'All',
  onFilterChange: undefined,
};

export default TaskFilter;