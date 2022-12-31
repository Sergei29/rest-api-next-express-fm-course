import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import morgan from "morgan";
import cors from "cors";

import { createNewUser, signIn } from "./handlers/users";
import { protect } from "./modules/auth";
import router from "./router";

/**
 * @description an error handler to catch all rest of uncaught errors, THAT happened synchronously ONLY. For all synchronous errors - use trycatch block, where inside catch block you can pass error to next function, then this error will be caught by this function
 * @example
 * const endpointDataHandler = async (req, res, next) => {
 *   try{
 *      const data = await callSomeApi()
 *      res.status(200).json({data})
 *    }catch(error){
 *      next(error)
 *    }
 * }
 * @param {unknown} error an error thrown
 * @param {Request} req request service object
 * @param {Response} res response service object
 * @param {NextFunction} next service Function to proceed to next
 * @returns {undefined} handles the incoming error occurence
 */
const handleErrors: ErrorRequestHandler = (error, req, res, next) => {
  const message =
    error instanceof Error ? error.message : "Server: an error occurred";
  res.status(500).json({ message: error.type || message });
};

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

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({
      message: "Hello!",
    })
    .end();
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signIn);
app.use(handleErrors);

export { app };
