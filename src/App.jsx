import { useState, useEffect, useRef } from 'react';
import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';
import './index.css';

// Ключ для localStorage
const localStorageKey = 'todoAppTasks';

function App() {

  // Состояние
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(localStorageKey);
    return savedTasks ? JSON.parse(savedTasks).map(task => ({
      ...task,
      date: new Date(task.date),
    })) : [];
  });
  
  const [filter, setFilter] = useState('All');

  const lastUpdateTime = useRef(Date.now());
  const timerRef = useRef(null);

  
  // LocalStorage
  useEffect(() => {
    // Подготовка данных для сохранения
    const tasksToSave = tasks.map(task => ({
      ...task,
      date: task.date.toISOString(),
    }));
    localStorage.setItem(localStorageKey, JSON.stringify(tasksToSave));
  }, [tasks]);


  useEffect(() => {
    // Обработчик события storage
    const handleStorageChange = (e) => {
      if (e.key === localStorageKey) {
        const newTasks = JSON.parse(e.newValue || '[]').map(task => ({
          ...task,
          date: new Date(task.date),
        }));
        setTasks(newTasks);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Функции для работы с задачами
  const addTask = (text, min = 0, sec = 0) => {
    const newTask = {
      id: Date.now(),
      text,
      date: new Date(),
      completed: false,
      secTimer: Math.max(0, (Number(min) * 60 + Math.max(0, Number(sec)))) || 0,
      timerRunning: false,
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

  // Таймер
  const toggleTimer = (id, isRunning) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (isRunning && task.id !== id && task.timerRunning) {
          return { ...task, timerRunning: false };
        }
        return task.id === id ? { ...task, timerRunning: isRunning } : task;
      });
      
      if (isRunning) {
        const tasksToSave = updatedTasks.map(task => ({
          ...task,
          date: task.date.toISOString(),
        }));
        localStorage.setItem(localStorageKey, JSON.stringify(tasksToSave));
      }
      
      return updatedTasks;
    });
  };
  
  useEffect(() => {
    let animationFrameId;
    let lastCalledTime;
  
    const updateTimer = (timestamp) => {
      if (!lastCalledTime) {
        lastCalledTime = timestamp;
      }
      
      const elapsed = timestamp - lastCalledTime;
      
      if (elapsed >= 1000) {
        lastCalledTime = timestamp;
        
        setTasks(prevTasks => {
          const hasActiveTimers = prevTasks.some(task => task.timerRunning && task.secTimer > 0);
          if (!hasActiveTimers) return prevTasks;
  
          return prevTasks.map(task => {
            if (task.timerRunning && task.secTimer > 0) {
              const newSecTimer = task.secTimer - 1;
              return {
                ...task,
                secTimer: newSecTimer,
                timerRunning: newSecTimer > 0
              };
            }
            return task;
          });
        });
      }
      
      animationFrameId = requestAnimationFrame(updateTimer);
    };
  
    animationFrameId = requestAnimationFrame(updateTimer);
  
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


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
          onToggleTimer={toggleTimer}
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
