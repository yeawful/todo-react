import { useState } from 'react';

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer';

import './index.css';

function App() {
  const [ tasks, setTasks ] = useState([
    // { id: 1, text: 'Completed task', date: new Date(), completed: false },
    // { id: 2, text: 'Editing task', date: new Date(), completed: false },
    // { id: 3, text: 'Active task', date: new Date(), completed: false },
  ]);

  const [filter, setFilter] = useState('All');

  const getFilteredTasks = () => {
    switch(filter) {
      case 'Active':
        return tasks.filter(task => !task.completed);
      case 'Completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      date: new Date(),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = getFilteredTasks();

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={addTask}/>
      </header>

      <section className="main">
      <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
        <Footer
          tasks={tasks}
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

export default App;
