import React from "react";
import OneTodo from "./OneTodo";

function TodoList(props) {
  const filteredTasks = props.tasks.filter((task) => {
    switch (props.filter) {
      case "ACTIVE":
        return !task.completed;
      case "COMPLETED":
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={(e) => props.onToggle(e.target.checked)}
      />
      <label htmlFor="toggle-all">Tâches finies</label>
      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <OneTodo
            key={task.id}
            task={task}
            onComplete={props.onComplete}
            onDestroy={props.onDestroy}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
