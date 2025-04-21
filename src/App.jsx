import { useState } from 'react';

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer';

import './index.css';

function App() {
  
  // Состояние
  const [tasks, setTasks ] = useState([]);
  const [filter, setFilter] = useState('All');


  // Функции для работы с задачами
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      date: new Date(),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };


  // Функции для фильтрации
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Рендер
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={addTask}/>
      </header>

      <section className="main">
      <TaskList 
          tasks={getFilteredTasks()} 
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
