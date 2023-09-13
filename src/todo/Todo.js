import {useState} from 'react';
import {createNewTask, INITIAL_TASKS} from './task-util';
import PropTypes from 'prop-types';
import './Todo.css';

let refresh = 1;

export function Todo() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    // Derived State (sub state from state)
    // do not put derived state in the state !
    const remainingTasks = tasks.filter((t) => !t.completed).length;

    console.log('REFRESH', refresh++);

    function onComplete(task) {
        setTasks((tasks) =>
          tasks.map((t) => (t.id === task.id ? {...task, completed: !task.completed} : t)));
    }

    function onDestroy(task) {
        setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    }

    function onToggle(checked) {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map((t) => {
                if (t.completed === checked) {
                    return t;
                } else {
                    return {...t, completed: checked};
                }
            });
            return newTasks;
        });
    }

    function onCreateTask(event) {
        if (event.keyCode === 13) {
            // setTasks(tasks => ([...tasks, createNewTask(value)])); // id will inc by 2 ! because of <StrictMode>
            // Solution
            // Avoid side-effect
            // prepare your data BEFORE updating the state
            const newTask = createNewTask(event.target.value);
            event.target.value = '';
            setTasks((tasks) => [...tasks, newTask]);
        }
    }

    return (
      <div className="App">
          <section className="todoapp">
              <header className="header">
                  <h1>Todo APP</h1>
              </header>
              <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    className="new-todo"
                    placeholder="Ajouter une tâche"
                    autoComplete="off"
                    autoFocus={true}
                    onKeyDown={onCreateTask}
                  />
              </form>
              <section className="main">
                  <input
                    type="checkbox"
                    id="toggle-all"
                    className="toggle-all"
                    onClick={(e) => onToggle(e.target.checked)}
                  />
                  <label htmlFor="toggle-all">Tâches finies</label>
                  <ul className="todo-list">
                      {tasks.map((task) => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <div className="view">
                                <input
                                  id={'task_' + task.id}
                                  type="checkbox"
                                  className="toggle"
                                  checked={task.completed}
                                  onChange={() => onComplete(task)}
                                />
                                <label htmlFor={'task_' + task.id}>{task.label}</label>
                                <button className="destroy" onClick={() => onDestroy(task)}/>
                            </div>
                        </li>
                      ))}
                  </ul>
              </section>
              <footer className="footer">
          <span className="todo-count">
            <strong>{remainingTasks} tâches restantes</strong>
          </span>
              </footer>
          </section>
      </div>
    );
}
