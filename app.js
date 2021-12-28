import express from "express";
import http from "http";
import { __dirname } from "./utils";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/styles", express.static("styles"));
app.use("/scripts", express.static("scripts"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log("A person is connected");

  // socket.on("disconnect", () => {
  //   console.log("A person is disconnected");
  // });

  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on *:${process.env.PORT}`);
});
