import { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm({ onAdd }) {
  const [ text, setText ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form className="new-todo-form"onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;