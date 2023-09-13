import React from "react";

export default function NewTodoForm(props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="new-todo"
        placeholder="Ajouter une tâche"
        autoComplete="off"
        autoFocus={true}
        onKeyDown={props.onCreateTask}
      />
    </form>
  );
}
