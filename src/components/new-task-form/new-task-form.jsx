import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
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

export default NewTaskForm;