import { Request, Response } from "express";

export const errorResponse = (
  res: Response,
  statusCode: number,
  error: string
) => {
  const responseObject = { statusCode, error };
  return res.status(statusCode).send(responseObject);
};

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = []
) => {
  const responseObject = { statusCode, message, data };
  return res.status(statusCode).send(responseObject);
};

export const handleError = (err: unknown, req: Request) => {
  console.log(`
  Error caught at ${req.path},
  Request body: ${JSON.stringify(req.body)},
  Request user: ${JSON.stringify(req.profile)},
  Request Params: ${JSON.stringify(req.params)},
  Request Query: ${JSON.stringify(req.query)},
  Error Message: ${JSON.stringify((err as Error).message)},
  Error Log: ${JSON.stringify((err as Error).stack)}
  `);
};
