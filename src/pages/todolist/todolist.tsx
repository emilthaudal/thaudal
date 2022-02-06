import * as React from "react";
import { useEffect, useState } from "react";
import { getLists } from "../../api/api";
import TodoListComponent from "../../components/todolistcomponent";
import TodoList from "../../model/todolist";
function TodoList(): JSX.Element {
  const [lists, setLists] = useState<TodoList[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLists(getLists());
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!lists) return <p>No todolists found</p>;

  const todoLists = lists.map((list, index) => (
    <TodoListComponent
      key={list.Title + index}
      Title={list.Title}
      TodoItems={list.TodoItems}
      Id={list.Id}
      Description={list.Description}
    ></TodoListComponent>
  ));

  return (
    <div>
      <main className="container flex flex-col">{todoLists}</main>
    </div>
  );
}
export default TodoList;
