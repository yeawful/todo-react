import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

function Task({ task, onToggle, onDelete, onUpdate }) {
  
  // Состояние
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);


  // Обработчики событий
  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = editText.trim();
    if (trimmedText) {
      onUpdate(task.id, trimmedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };


  // Рендер редактирования
  if (isEditing) {
    return (
      <li className="editing">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      </li>
    );
  }


  // Рендер 
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <label className="task-label">
          <span className="description">{task.text}</span>
          <div className="timer-controls">
            <button type="button" className="icon icon-play" />
            <button type="button" className="icon icon-pause" />
            <span className="time">00:00</span>
          </div>
          <span className="created">
            created {formatDistanceToNow(task.date, { addSuffix: true, includeSeconds: true })}
          </span>
        </label>

        <button
          type="button"
          name="edit"
          aria-label="Edit"
          className="icon icon-edit"
          onClick={handleEdit}
        />
        <button
          type="button"
          name="remove"
          aria-label="Remove"
          className="icon icon-destroy"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;