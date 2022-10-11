import {Request, Response, NextFunction} from "express";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  res.status(500).json({
    err: error.message,
  });
}
