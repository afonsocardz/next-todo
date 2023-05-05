import { TodoReturnData } from "@/interfaces";
import TodoItem from "./TodoItem";
import { CSSProperties } from "react";

interface TodoListProps {
  todos: TodoReturnData[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div style={listStyle}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

const listStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "12px",
  backgroundColor: "white",
  overflow: "scroll",
  height: "100%",
  width: "100%",
};
