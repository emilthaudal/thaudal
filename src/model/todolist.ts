import TodoItem from "./TodoItem";

interface TodoList {
  Title: string;
  Description?: string;
  TodoItems: TodoItem[];
  Id: string;
}
export default TodoList;
