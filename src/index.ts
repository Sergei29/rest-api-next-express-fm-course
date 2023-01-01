import * as dotenv from "dotenv";
import { app } from "./server";
import config from "./config";

dotenv.config();

app.listen(config.port, () => {
  config.stage === "local" &&
    console.log(`express server at: http://localhost:${config.port}`);
});
