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

export default TaskFilter;