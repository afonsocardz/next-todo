import styled from "styled-components";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { TodoReturnData } from "@/interfaces";
import { TodoContext } from "@/pages/todos";
import { FaCheck, FaTrash } from "react-icons/fa";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type TriggerFunction = <SWRData = TodoReturnData>(
  extraArgument: {
    done: boolean;
  },
  options?:
    | SWRMutationConfiguration<
        TodoReturnData,
        any,
        {
          done: boolean;
        },
        `api/todos/${number}`,
        SWRData
      >
    | undefined
) => Promise<TodoReturnData | undefined>;

interface TodoItemProps {
  todo: TodoReturnData;
}

interface CheckTodoBody {
  arg: {
    done: boolean;
  };
}

const checkTodo = (url: string, { arg }: CheckTodoBody) =>
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  }).then<TodoReturnData>((res) => res.json());

const deleteTodoRequest = (url: string) =>
  fetch(url, {
    method: "DELETE",
  });

export default function TodoItem({ todo }: TodoItemProps) {
  const { setSelectedTodo, mutate, todos } = useContext(TodoContext);
  const [check, setCheck] = useState(todo.done);

  const { trigger } = useSWRMutation(`api/todos/${todo.id}`, checkTodo, {
    onSuccess: async () => {
      await mutate();
    },
  });

  const { trigger: deleteTodo } = useSWRMutation(
    `api/todos/${todo.id}`,
    deleteTodoRequest,
    {
      onSuccess: async () => {
        await mutate();
      },
    }
  );

  return (
    <ItemContainer onClick={() => setSelectedTodo(todo)}>
      <p>{todo.text}</p>
      <ItemButtonsContainer>
        <Checkbox done={check} setCheck={setCheck} trigger={trigger} />
        <TrashButton
          onClick={async (e) => {
            e.stopPropagation();
            await deleteTodo();
          }}
        />
      </ItemButtonsContainer>
    </ItemContainer>
  );
}

const TrashButton = styled(FaTrash)`
  cursor: pointer;
  :hover {
    color: darkred;
  }
  transition: color 0.2s ease-in-out;
`;

const ItemButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

interface CheckboxProps {
  done: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
  trigger: TriggerFunction;
}

function Checkbox({ done, setCheck, trigger }: CheckboxProps) {
  return (
    <CheckboxContainer
      done={done}
      onClick={async (e) => {
        e.stopPropagation();
        setCheck((prev) => {
          return !prev;
        });
        await trigger({ done: !done });
      }}
    >
      {done && <FaCheck />}
    </CheckboxContainer>
  );
}

interface CheckboxContainerProps {
  done: boolean;
}

const CheckboxContainer = styled.div<CheckboxContainerProps>`
  height: 20px;
  width: 20px;
  border-radius: 3px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ done }) => (done ? "lightgreen" : "white")};
`;

const ItemContainer = styled.div`
  background-color: lightgray;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  cursor: pointer;
  padding: 12px;
  gap: 8px;
  :hover {
    background-color: darkgray;
  }
  transition: background-color 0.2s ease-in-out;
`;
