import * as React from "react";
// @ts-ignore
import TodoList from "../model/todolist";

function TodoListComponent(props: TodoList): JSX.Element {
  return (
    <div className="flex-row">
      <p>{props.Title}</p>
      <p>{props.Description}</p>
    </div>
  );
}
export default TodoListComponent;
