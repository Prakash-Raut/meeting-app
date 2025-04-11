import cors from "cors";
import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import morgan from "morgan";

export const createExpressServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .get("/message/:name", (req: Request, res: Response, next: NextFunction) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (req: Request, res: Response, next: NextFunction) => {
      res.json({ ok: true });
    })

  return app;
};