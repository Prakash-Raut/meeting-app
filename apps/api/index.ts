import * as http from "node:http";
import { Server } from "socket.io";
import roomHandler from "./handlers/RoomHandler.js";
import { createExpressServer } from "./server.js";

const port = 5501;
const expressServer = createExpressServer();
const httpServer = http.createServer(expressServer);

const io = new Server(httpServer, {
	cors:{
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("✅ Connected:", socket.id);
  socket.emit("hello", { msg: "You are connected!" });
	roomHandler(socket);
	socket.on("disconnect", (reason) => {
		console.log("❌ Disconnected:", socket.id, reason);
		socket.disconnect(true);
	});
});

httpServer.listen(port, () => {
	console.log(`🔥 API is live!`);
});
