import styled from "styled-components";
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
  const { selectedTodo, setSelectedTodo, mutate } = useContext(TodoContext);

  const { trigger } = useSWRMutation("/api/todos/", addTodo, {
    onSuccess: async () => {
      await mutate();
    },
  });

  const { trigger: update } = useSWRMutation(
    `/api/todos/${selectedTodo?.id}`,
    updateTodo,
    {
      onSuccess: async () => {
        await mutate();
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
    <form
      style={{ width: "100%" }}
      onSubmit={async (e) => {
        e.preventDefault();
        setSelectedTodo(undefined);
        if (selectedTodo !== undefined) {
          return await update({ text });
        }
        return await trigger({ text });
      }}
    >
      <div style={inputContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="What to do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SaveButton type="submit">Save</SaveButton>
        {selectedTodo !== undefined && (
          <div
            onClick={() => setSelectedTodo(undefined)}
            style={closeButtonStyle}
          >
            X
          </div>
        )}
      </div>
    </form>
  );
}

const inputContainerStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const inputStyle: CSSProperties = {
  height: "30px",
  width: "80%",
  borderRadius: "5px",
  padding: "8px",
  border: "none",
};

const SaveButton = styled.button`
  height: ${inputStyle.height};
  width: 20%;
  background-color: green;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  :hover {
    background-color: lightgreen;
    color: black;
  }
  transition: all 0.2s ease-in-out;
`;

const closeButtonStyle: CSSProperties = {
  height: inputStyle.height,
  width: inputStyle.height,
  backgroundColor: "lightgray",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
