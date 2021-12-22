import express from "express";
import http from "http";
import { __dirname } from "./utils";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log("A person is connected");

  // socket.on("disconnect", () => {
  //   console.log("A person is disconnected");
  // });

  socket.on("message", (messageContent) => {
    io.emit("message", messageContent);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on *:${process.env.PORT}`);
});
