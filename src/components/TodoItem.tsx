import { TodoReturnData } from "@/interfaces";
import { TodoContext } from "@/pages/todos";
import { useContext } from "react";

interface TodoItemProps {
  todo: TodoReturnData;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { setSelectedTodo } = useContext(TodoContext);
  return (
    <div onClick={() => setSelectedTodo(todo)}>
      <span>{todo.id}</span>
      <p>{todo.text}</p>
    </div>
  );
}
