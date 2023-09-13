import { useState } from "react";
import { createNewTask, INITIAL_TASKS } from "./task-util";
import PropTypes from "prop-types";
import "./Todo.css";
import OneTdo from "./dumbs/OneTodo";
import NewTodoForm from "./dumbs/Newform";

let refresh = 1;

export function Todo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState("ALL");
  // Derived State (sub state from state)
  // do not put derived state in the state !
  const remainingTasks = tasks.filter((t) => !t.completed).length;

  console.log("REFRESH", refresh++);

  function onComplete(task) {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...task, completed: !task.completed } : t
      )
    );
  }

  function onDestroy(task) {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  }

  function onToggle(checked) {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((t) => {
        if (t.completed === checked) {
          return t;
        } else {
          return { ...t, completed: checked };
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
      event.target.value = "";
      setTasks((tasks) => [...tasks, newTask]);
    }
  }

  function onFilterClick(filter) {
    setFilter(filter);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") {
      return true;
    } else if (filter === "ACTIVE") {
      return !task.completed;
    } else if (filter === "COMPLETED") {
      return task.completed;
    }
  });

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>Todo APP</h1>
        </header>
        <NewTodoForm onCreateTask={onCreateTask} />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={(e) => onToggle(e.target.checked)}
          />
          <label htmlFor="toggle-all">Tâches finies</label>
          <ul className="todo-list">
            {filteredTasks.map((task) => (
              <OneTdo
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDestroy={onDestroy}
              />
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{remainingTasks} tâches restantes</strong>
          </span>
          <ul className="filters">
            <ActionFilterButton
              filter="ALL"
              currentFilter={filter}
              onFilterClick={onFilterClick}
            >
              ALL
            </ActionFilterButton>
            <ActionFilterButton
              filter="ACTIVE"
              currentFilter={filter}
              onFilterClick={onFilterClick}
            >
              ACTIVE
            </ActionFilterButton>
            <ActionFilterButton
              filter="COMPLETED"
              currentFilter={filter}
              onFilterClick={onFilterClick}
            >
              COMPLETED
            </ActionFilterButton>
          </ul>
        </footer>
      </section>
    </div>
  );
}

function ActionFilterButton({
  filter,
  currentFilter,
  onFilterClick,
  children,
}) {
  const className = filter === currentFilter ? "selected" : "";
  return (
    <li>
      <a className={className} onClick={() => onFilterClick(filter)}>
        {children}
      </a>
    </li>
  );
}
