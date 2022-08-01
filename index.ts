import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http'
import { Server } from "socket.io";
// Configure .env file
dotenv.config();
// Set up express and socket server
const app: Express = express();
// Route all requests to default response
app.get('*', (req: Request, res: Response) => {
  res.send('Express + Typescript server')
})
// Create an http server and pass to socket server
const httpServer = createServer(app)
const io = new Server(httpServer, {})
// On connection event for the socket
io.on('connection', (socket) => {
  console.log('Socket connected', socket)
  // TODO: Handle connections
  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', reason)
    // TODO: Handle disconnect event
  })
})
// Start HTTP server
// TODO: use HTTPS in production
const port = process.env.PORT;
httpServer.listen(port)