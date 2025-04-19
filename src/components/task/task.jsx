import { formatDistanceToNow } from 'date-fns';
import './task.css';

function Task({ task, onToggle, onDelete }) {
  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <label>
          <span className="description">{task.text}</span>
          <span className="created">
            created {formatDistanceToNow(task.date, { addSuffix: true, includeSeconds: true })}
          </span>
        </label>

        <button type="button" 
                name="edit" 
                aria-label="Edit" 
                className="icon icon-edit" 
                />
        <button type="button" 
                name="remove" 
                aria-label="Remove" 
                className="icon icon-destroy" 
                onClick={() => onDelete(task.id)}
                />
      </div>
    </>
  )
}

export default Task;