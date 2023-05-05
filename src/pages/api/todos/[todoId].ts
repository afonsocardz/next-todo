import { todosData } from "@/database/data";
import { NextApiRequest, NextApiResponse } from "next";

enum TodosMethods {
  PUT = "PUT",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request = method[req.method as TodosMethods];
  await request(req, res);
}

async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  const { todoId } = req.query;

  const index = todosData.findIndex((todo) => todo.id === Number(todoId));

  todosData[index] = { id: Number(todoId), ...params };

  res.status(200).send(todosData[index]);
}

const method = {
  PUT: (req: NextApiRequest, res: NextApiResponse) => updateTodo(req, res),
};
