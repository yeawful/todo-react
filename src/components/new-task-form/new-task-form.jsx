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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;