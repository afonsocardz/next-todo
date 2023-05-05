import { todosData } from "@/database/data";
import { NextApiRequest, NextApiResponse } from "next";

enum TodosMethods {
  GET = "GET",
  POST = "POST",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request = method[req.method as TodosMethods];
  await request(req, res);
}

async function getTodos(req: NextApiRequest, res: NextApiResponse) {
  const todos = todosData;
  res.status(200).send(todos);
}

async function addTodo(req: NextApiRequest, res: NextApiResponse) {
  const { text } = JSON.parse(req.body);

  const newTodo = { id: todosData.length + 1, text, done: false };

  todosData.push(newTodo);

  res.status(201).send(newTodo);
}

const method = {
  GET: (req: NextApiRequest, res: NextApiResponse) => getTodos(req, res),
  POST: (req: NextApiRequest, res: NextApiResponse) => addTodo(req, res),
};
