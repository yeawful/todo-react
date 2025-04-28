import { useState, useEffect, useCallback } from 'react';
import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';
import './index.css';

// Ключ для localStorage
const localStorageKey = 'todoAppTasks';
const localStorageTimerKey = 'todoAppTimerStart';

function App() {

  // Состояние тасков(учитывая localStorage) и фильтров
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(localStorageKey);
    return savedTasks ? JSON.parse(savedTasks).map(task => ({
      ...task,
      date: new Date(task.date),
    })) : [];
  });

  const [filter, setFilter] = useState('All');
  

  // Автосохранение задач в localStorage
  useEffect(() => {
    const tasksToSave = tasks.map(task => ({
      ...task,
      date: task.date.toISOString(),
    }));
    localStorage.setItem(localStorageKey, JSON.stringify(tasksToSave));
  }, [tasks]);


  // Таймер
  const toggleTimer = useCallback((id, isRunning) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id !== id) return task;
  
      if (!isRunning) {
        const timerDataJson = localStorage.getItem(localStorageTimerKey);
        const timerData = timerDataJson && JSON.parse(timerDataJson);
        
        if (timerData?.id === id) {
          const elapsed = Math.floor((Date.now() - timerData.startTime) / 1000);
          localStorage.removeItem(localStorageTimerKey);
          return {
            ...task,
            timerRunning: false,
            secTimer: Math.max(0, timerData.initialSeconds - elapsed)
          };
        }
      } else {
        localStorage.setItem(localStorageTimerKey, JSON.stringify({
          id,
          startTime: Date.now(),
          initialSeconds: task.secTimer
        }));
      }
  
      return { ...task, timerRunning: isRunning };
    }));
  }, []);


  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === localStorageKey) {
        try {
          const newTasks = JSON.parse(e.newValue || '[]').map(task => ({
            ...task,
            date: new Date(task.date)
          }));
          setTasks(newTasks);
        } catch {
          setTasks([]);
        }
        return;
      }

      // Обработка изменений таймера (упрощенная версия)
      if (e.key === localStorageTimerKey) {
        const timerData = e.newValue ? JSON.parse(e.newValue) : null;
        if (!timerData) return;
        
        setTasks(prev => prev.map(task => ({
          ...task,
          timerRunning: task.id === timerData.id
        })));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // Пустой массив зависимостей - эффект запускается только при монтировании


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

