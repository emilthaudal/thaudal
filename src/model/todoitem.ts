interface TodoItem {
  Id: string;
  Completed: boolean;
  Title: string;
  Description?: string;
  CompletedTime?: Date;
  DueDate?: Date;
  Priority: number;
  SubTasks: TodoItem[];
}
export default TodoItem;
