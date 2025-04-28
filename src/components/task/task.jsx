import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

function Task({ task, onToggle, onDelete, onUpdate, onToggleTimer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [displayTime, setDisplayTime] = useState(task.secTimer);
  const timerRef = useRef(null);

  useEffect(() => {
    // Очистка предыдущего таймера
    clearInterval(timerRef.current);
  
    if (task.timerRunning) {
      const timerStr = localStorage.getItem('todoAppTimerStart');
      if (!timerStr) return;
  
      const timerData = JSON.parse(timerStr);
      if (timerData.id !== task.id) return;
  
      setDisplayTime(timerData.initialSeconds);
  
      const updateTimer = () => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - timerData.startTime) / 1000);
        const remainingSeconds = Math.max(0, timerData.initialSeconds - elapsedSeconds);
  
        setDisplayTime(remainingSeconds);
  
        if (remainingSeconds <= 0) {
          onToggleTimer(task.id, false);
        }
      };
  
      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);
    } else {
      setDisplayTime(task.secTimer);
    }
  
    // Очистка таймера при размонтировании или изменении зависимостей
    return () => clearInterval(timerRef.current);
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

  // Форматирование времени
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

  // Основной рендер
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
              className={`icon ${task.timerRunning ? 'icon-pause' : 'icon-play'}`}
              onClick={() => onToggleTimer(task.id, !task.timerRunning)}
              aria-label={task.timerRunning ? 'Pause' : 'Start'}
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
          aria-label="Edit"
          className="icon icon-edit"
          onClick={handleEdit}
        />
        <button
          type="button"
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
    timerRunning: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(Task);
