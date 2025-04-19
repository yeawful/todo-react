import PropTypes from 'prop-types';
import './tasks-filter.css';

function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' }
  ];

  return (
    <ul className="filters">
      {filters.map((filterItem) => {
        const { name, label } = filterItem;
        const buttonClass = currentFilter === name ? 'selected' : '';
    
        return (
          <li key={name}>
            <button
              className={buttonClass}
              onClick={() => onFilterChange(name)}>
              {label}
            </button>
         </li>
        );
      })}
    </ul>
  )
}

TaskFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  currentFilter: 'All',
};

export default TaskFilter;