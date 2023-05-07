import { todosData } from "@/database/data";
import { NextApiRequest, NextApiResponse } from "next";

type ApiRequest = NextApiRequest & {
  method: TodosMethods;
};

enum TodosMethods {
  PUT = "PUT",
  DELETE = "DELETE",
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const request = method[req.method];
  await request(req, res);
}

async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  const { todoId } = req.query;

  const index = todosData.findIndex((todo) => todo.id === Number(todoId));

  todosData[index] = { ...todosData[index], ...params };

  res.status(200).send(todosData[index]);
}

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
  const { todoId } = req.query;

  const index = todosData.findIndex((todo) => todo.id === Number(todoId));
  todosData.splice(index, 1);

  res.status(204).end();
}

const method = {
  PUT: (req: NextApiRequest, res: NextApiResponse) => updateTodo(req, res),
  DELETE: (req: NextApiRequest, res: NextApiResponse) => deleteTodo(req, res),
};
