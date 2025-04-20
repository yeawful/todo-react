import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

function Task({ task, onToggle, onDelete, onUpdate, onStartTimer, onPauseTimer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (task.timer.isRunning) {
      onPauseTimer(task.id);
    } else {
      onStartTimer(task.id);
    }
  };

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

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <label>
          <span className="description">{task.text}</span>
          <section className="timer">
            <button 
              type="button" 
              className={`icon ${task.timer.isRunning ? 'icon-pause' : 'icon-play'}`}
              onClick={handlePlayPause}
            />
            <span className="time">{formatTime(task.timer.seconds)}</span>
          </section>
          <span className="created">created {formatDistanceToNow(task.date, { addSuffix: true, includeSeconds: true })}
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
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};

export default Task;