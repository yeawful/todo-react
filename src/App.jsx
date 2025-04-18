import { Component } from 'react';

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer';

import './index.css';

class App extends Component {
  state = {
    tasks: [
      { id: 1, text: 'Completed task', date: new Date() },
      { id: 2, text: 'Editing task', date: new Date()},
      { id: 3, text: 'Active task', date: new Date(Date.now() - 280000)},
    ],
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm/>
        </header>

        <section className="main">
          <TaskList tasks={this.state.tasks}/>
          <Footer/>
        </section>
      </section>
    );
  }
}

export default App;
