import useSwr, { KeyedMutator } from "swr";
import { TodoReturnData } from "@/interfaces/todoInterfaces";
import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from "react";
import TodoLayout from "@/layouts/TodoLayout";
import TodoList from "@/components/TodoList";
import { NextPageWithLayout } from "../_app";
import { notUndefined } from "@/utils";
import TodoInput from "@/components/TodoInput";

const fetcher = (url: string) =>
  fetch(url).then<TodoReturnData[]>((res) => res.json());

interface TodoContextInitial {
  selectedTodo: undefined | TodoReturnData;
  setSelectedTodo: Dispatch<SetStateAction<TodoReturnData | undefined>>;
  mutate: KeyedMutator<TodoReturnData[]>;
  todos: TodoReturnData[];
}

export const TodoContext = createContext({} as TodoContextInitial);

const Todos: NextPageWithLayout = function () {
  const { data, mutate } = useSwr("/api/todos", fetcher);
  const [selectedTodo, setSelectedTodo] = useState<TodoReturnData>();

  const todos = notUndefined<TodoReturnData>(data);

  return (
    <div style={todoContainerStyle}>
      <TodoContext.Provider
        value={{ selectedTodo, setSelectedTodo, mutate, todos }}
      >
        <TodoInput />
        <TodoList todos={todos} />
      </TodoContext.Provider>
    </div>
  );
};

const todoContainerStyle: CSSProperties = {
  height: "400px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  borderRadius: "12px",
  backgroundColor: "black",
  padding: "15px",
};

Todos.getLayout = (page: ReactElement) => {
  return (
    <>
      <TodoLayout>{page}</TodoLayout>
    </>
  );
};

export default Todos;
