import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

function Task({ task, onToggle, onDelete, onUpdate, onToggleTimer }) {
  
  // Состояние
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [displayTime, setDisplayTime] = useState(task.secTimer);

  // Эффект для таймера
  useEffect(() => {
    if (!task.timerRunning) {
      setDisplayTime(task.secTimer);
      return;
    }

    const timerStr = localStorage.getItem('todoAppTimerStart');
    if (!timerStr) return;

    const timerData = JSON.parse(timerStr);
    if (timerData.id !== task.id) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - timerData.startTime) / 1000);
      const remainingSeconds = Math.max(0, timerData.initialSeconds - elapsedSeconds);
      
      setDisplayTime(remainingSeconds);
      
      if (remainingSeconds <= 0) {
        onToggleTimer(task.id, false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [task.timerRunning, task.id, task.secTimer, onToggleTimer]);


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

  // Таймер
  const formatTime = (seconds) => {
    const secs = Number(seconds) || 0;
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
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
            <button 
              type="button" 
              className="icon icon-play" 
              onClick={() => onToggleTimer(task.id, true)}
            />
            <button 
              type="button" 
              className="icon icon-pause" 
              onClick={() => onToggleTimer(task.id, false)}
            />
            <span className="time">
              {formatTime(displayTime)}
            </span>
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
  onToggleTimer: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
    secTimer: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(Task);