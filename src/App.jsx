import { Component, useState } from 'react';

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer';

import './index.css';

function App() {
  const [ tasks, setTasks ] = useState([
    { id: 1, text: 'Completed task', date: new Date(), completed: false },
    { id: 2, text: 'Editing task', date: new Date(), completed: false },
    { id: 3, text: 'Active task', date: new Date(Date.now() - 280000), completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm/>
      </header>

      <section className="main">
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}/>
        <Footer/>
      </section>
    </section>
  );
}

export default App;
