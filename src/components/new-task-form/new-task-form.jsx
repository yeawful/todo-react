import { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm({ onAdd }) {
  // Состояние
  const [ text, setText ] = useState('');


  // Обработчики отправки формы и изменения поля ввода 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
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
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;