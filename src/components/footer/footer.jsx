import TaskFilter from '../tasks-filter/tasks-filter'

import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter/>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default Footer;