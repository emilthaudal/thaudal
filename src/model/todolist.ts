import TodoItem from "./todoitem";

interface TodoList {
  Title: string;
  Description?: string;
  TodoItems: TodoItem[];
  Id: string;
}
export default TodoList;
