import { app } from "./server";

const PORT = process.env.POST || 3001;

app.listen(PORT, () => {
  console.log(`express server at: http://localhost:${PORT}`);
});
