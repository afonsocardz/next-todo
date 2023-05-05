import { TodoReturnData } from "@/interfaces";

interface TodoItemProps {
  todo: TodoReturnData;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <>
      <div>
        <span>{todo.id}</span>
        <p>{todo.text}</p>
      </div>
    </>
  );
}
