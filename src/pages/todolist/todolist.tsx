import * as React from "react";
import { useEffect, useState } from "react";
import TodoListComponent from "../../components/todolistcomponent";
import TodoList from "../../model/todolist";
function TodoList(): JSX.Element {
  const [lists, setLists] = useState<TodoList[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API + "/api/TodoList/GetLists")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error getting lists");
      })
      .then((response) => {
        if (!response) {
          return;
        }
        let todoLists: TodoList[] = [];
        response.map((list: TodoList) => {
          todoLists.push(list);
        });
        setLists(todoLists);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
