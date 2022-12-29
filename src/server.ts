import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";

/**
 * @description custom middleware
 * @param {string} message message that can be passed into middleware
 * @returns {Function} middleware function
 */
const customLogger =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log("request logged to: ", req.url);
    console.log("message: ", message);
    next();
  };

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(customLogger("Message from Serge."));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Hello!",
    })
    .end();
});

app.use("/api", router);

export { app };
