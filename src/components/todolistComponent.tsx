import * as React from "react";
import TodoList from "../model/todolist";

function TodoListComponent(props: TodoList) {
  return (
    <div className="flex-row">
      <p>{props.Title}</p>
      <p>{props.Description}</p>
    </div>
  );
}
export default TodoListComponent;
