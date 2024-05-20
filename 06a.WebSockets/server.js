// Import 'express'
import express from "express";

// Import the 'createServer' function from the 'http' module to create an HTTP server
import { createServer } from "http";

// Import the 'WebSocketServer' class from the 'ws' module to create a WebSocket server
import { WebSocketServer } from "ws";

// Create an instance of the Express application
const app = express();

// Create an HTTP server using the Express application
const server = createServer(app);

// Create a WebSocket server instance using the HTTP server
const wss = new WebSocketServer({ server });

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Event listener for a new WebSocket connection
wss.on("connection", (ws) => {
  console.log("A new client connected");

  // Event listener for receiving a message from a client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
    
      if (client.readyState === ws.OPEN) {
        console.log("broadcast it");
        // message is binary data? convert before sending.
        client.send(Buffer.from(message).toString('utf-8'));
      }
    });
  });

    // Event listener for closing a client connection
  ws.on("close", () => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send("A client disconnected");
      }
    });
    console.log("A client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
