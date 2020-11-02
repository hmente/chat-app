import http from "http" ;
import express from "express";
import logger from "morgan";
import cors from "cors";
import socketio from "socket.io";
// mongo connection
import "../config/mongo.js";
// socket configuration
import WebSockets from "../utils/WebSockets.js";
// routes
import indexRouter from "../routes/index.js";
import userRouter from "../routes/user.js";
import chatRoomRouter from "../routes/chatRoom.js";
// middlewares
import { decode } from '../middlewares/jwt.js'

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
//allows nested json
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
//there exists decode parameter which shows  this route is authenticated
app.use("/room", decode, chatRoomRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});


/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
//As soon as a port starts listening on the server, sockets starts listening for events happening on that port as well
global.io = socketio.listen(server);
//Every time someone from the front end makes a socket connection, the connection method will be called which will invoke our Websockets class and inside that class the connection method
global.io.on('connection', WebSockets.connection);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
