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

const updateTodo = (url: string, { arg }: AddTodoBody) =>
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  }).then<TodoReturnData>((res) => res.json());

export default function TodoInput() {
  const [text, setText] = useState("");
  const { selectedTodo, setSelectedTodo, mutate, todos } =
    useContext(TodoContext);

  const { trigger } = useSWRMutation("/api/todos/", addTodo, {
    onSuccess: (data) => {
      mutate([...todos, data]);
    },
  });

  const { trigger: update } = useSWRMutation(
    `/api/todos/${selectedTodo?.id}`,
    updateTodo,
    {
      onSuccess: (data) => {
        const index = todos.findIndex((todo) => todo.id === data.id);
        todos[index] = { ...data };
        mutate([...todos]);
      },
    }
  );

  useEffect(() => {
    if (selectedTodo !== undefined) {
      setText(selectedTodo.text);
    }
    if (selectedTodo === undefined) {
      setText("");
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
          setSelectedTodo(undefined);
          if (selectedTodo !== undefined) {
            return await update({ text });
          }
          return await trigger({ text });
        }}
      >
        Save
      </button>
      {selectedTodo !== undefined && (
        <div
          onClick={() => setSelectedTodo(undefined)}
          style={closeButtonStyle}
        >
          X
        </div>
      )}
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

const closeButtonStyle: CSSProperties = {
  height: inputStyle.height,
  width: inputStyle.height,
  backgroundColor: "lightgray",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
