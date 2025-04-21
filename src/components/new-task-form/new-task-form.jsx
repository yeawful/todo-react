import { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm({ onAdd }) {
  // Состояние
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');


  // Обработчики отправки формы и изменения поля ввода 
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      const minutes = min === '' ? 0 : Number(min);
      const seconds = sec === '' ? 0 : Number(sec);
      onAdd(trimmedText, minutes, seconds);
      setText('');
      setMin('');
      setSec('');
    }
  };

  const handleMinChange = (e) => {
    setMin(e.target.value);
  };
  
  const handleSecChange = (e) => {
    setSec(e.target.value);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };


  // Рендер
  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        min="0"
        max="59"
        value={min}
        onChange={handleMinChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        min="0"
        max="59"
        value={sec}
        onChange={handleSecChange}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;