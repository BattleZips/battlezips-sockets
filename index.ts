import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http'
import { Server } from "socket.io";
import cors from 'cors'
// Configure .env file
dotenv.config();
// Set up express and socket server
const app: Express = express();
app.use(cors())
// Route all requests to default response
app.get('*', (req: Request, res: Response) => {
  res.send('Express + Typescript server')
})
// Create an http server and pass to socket server
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})
// On connection event for the socket
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id)
  // TODO: Handle connections
  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', reason)
    // TODO: Handle disconnect event
  })
})
// Start HTTP server
// TODO: use HTTPS in production
const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log('Server is connected')
})