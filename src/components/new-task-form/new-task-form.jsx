import './new-task-form.css';

function NewTaskForm() {
  return (
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
    />
  )
}

export default NewTaskForm;