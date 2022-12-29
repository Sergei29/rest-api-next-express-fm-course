import * as dotenv from "dotenv";
import { app } from "./server";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`express server at: http://localhost:${PORT}`);
});
