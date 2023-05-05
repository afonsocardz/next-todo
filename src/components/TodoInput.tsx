import { TodoReturnData } from "@/interfaces";
import { TodoContext } from "@/pages/todos";
import { CSSProperties, useContext, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

interface AddTodoBody {
  arg: {
    text: string;
  };
}

const addTodo = (url: string, { arg }: AddTodoBody) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then<TodoReturnData>((res) => res.json());

export default function TodoInput() {
  const [text, setText] = useState("");
  const { selectedTodo, mutate, todos } = useContext(TodoContext);
  const { trigger } = useSWRMutation("/api/todos", addTodo, {
    onSuccess: async (data) => {
      const rest = todos.filter((todo) => todo.id !== data.id);
      await mutate([...rest, data]);
    },
  });

  useEffect(() => {
    if (selectedTodo !== undefined) {
      setText(selectedTodo.text);
    }
  }, [selectedTodo]);
  return (
    <div style={inputContainerStyle}>
      <input
        style={inputStyle}
        type="text"
        placeholder="What to do?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={async () => {
          await trigger({ text });
        }}
      >
        Save
      </button>
    </div>
  );
}

const inputContainerStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const inputStyle: CSSProperties = {
  height: "30px",
};
