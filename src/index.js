const http = require("http");

const PORT = process.env.POST || 3001;

const server = http.createServer((req, res) => {
  if (req.url !== "/" || req.method !== "GET") {
    res
      .writeHead(403, { "Content-Type": "application/json" })
      .write(JSON.stringify({ message: "Nope!" }));
    return;
  }

  res
    .writeHead(200, { "Content-Type": "application/json" })
    .write(JSON.stringify({ message: "Hello!" }));

  res.end();
  return;
});

server.listen(PORT, () => {
  console.log(`server is listening at: http://localhost:${PORT}`);
});
