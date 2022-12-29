import express from "express";
import router from "./router";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" }).end();
});

app.use("/api", router);

export { app };
