import { useState, useEffect } from 'react';

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer';

import './index.css';

function App() {
  const [ tasks, setTasks ] = useState([
    { id: 1, text: 'Completed task', date: new Date(), completed: false,       timer: {
        seconds: 0,
        isRunning: false,
        lastStartTime: null,
        accumulatedTime: 0
      }},
    { id: 2, text: 'Editing task', date: new Date(), completed: false,       timer: {
        seconds: 0,
        isRunning: false,
        lastStartTime: null,
        accumulatedTime: 0
      }},
    { id: 3, text: 'Active task', date: new Date(), completed: false,       timer: {
        seconds: 0,
        isRunning: false,
        lastStartTime: null,
        accumulatedTime: 0
      }},
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
      completed: false,
      timer: {
        seconds: 0,
        isRunning: false,
        lastStartTime: null,
        accumulatedTime: 0
      }
    };
    setTasks([...tasks, newTask]);
  };

  const startTimer = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          timer: {
            ...task.timer,
            isRunning: true,
            lastStartTime: new Date()
          }
        };
      }
      return task;
    }));
  };
  
  const pauseTimer = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id && task.timer.isRunning) {
        const now = new Date();
        const elapsed = Math.floor((now - task.timer.lastStartTime) / 1000);
        
        return {
          ...task,
          timer: {
            ...task.timer,
            isRunning: false,
            accumulatedTime: task.timer.accumulatedTime + elapsed,
            lastStartTime: null
          }
        };
      }
      return task;
    }));
  };
  
  const resetTimer = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          timer: {
            seconds: 0,
            isRunning: false,
            lastStartTime: null,
            accumulatedTime: 0
          }
        };
      }
      return task;
    }));
  };
  
  // Обновляем таймер каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => prevTasks.map(task => {
        if (task.timer.isRunning && task.timer.lastStartTime) {
          const now = new Date();
          const elapsed = Math.floor((now - task.timer.lastStartTime) / 1000);
          const totalSeconds = task.timer.accumulatedTime + elapsed;
          
          return {
            ...task,
            timer: {
              ...task.timer,
              seconds: totalSeconds
            }
          };
        }
        return task;
      }));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // При скрытии вкладки паузим все таймеры
        setTasks(prevTasks => prevTasks.map(task => {
          if (task.timer.isRunning) {
            const now = new Date();
            const elapsed = Math.floor((now - task.timer.lastStartTime) / 1000);
            
            return {
              ...task,
              timer: {
                ...task.timer,
                isRunning: false,
                accumulatedTime: task.timer.accumulatedTime + elapsed,
                lastStartTime: null
              }
            };
          }
          return task;
        }));
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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
          onStartTimer={startTimer}
          onPauseTimer={pauseTimer}
          onResetTimer={resetTimer}
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
