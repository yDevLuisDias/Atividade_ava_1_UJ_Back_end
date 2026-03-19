import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export function requestContext(req: Request, res: Response, next: NextFunction): void {
  const requestId = req.header("x-request-id") ?? randomUUID();
  res.setHeader("x-request-id", requestId);
  res.setHeader("x-api-version", "1.0");
  next();
}