import { todosData } from "@/database/data";
import { NextApiRequest, NextApiResponse } from "next";

enum TodosMethods {
  GET = "GET",
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

const method = {
  GET: (req: NextApiRequest, res: NextApiResponse) => getTodos(req, res),
};
