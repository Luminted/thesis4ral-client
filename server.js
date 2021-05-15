const express = require("express");
const path = require("path");
const app = express();

const serverPort = process.env.REACT_APP_TABLE_SOCKET_PORT;

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(serverPort, () => {
  console.log(`listening at localhost:${serverPort}`)
});