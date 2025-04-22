const express = require('express');
const connectDB = require('./config/connectDB'); // Ensure file name matches
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app and connect DB
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes (Corrected file names based on your structure)
app.use('/api/users', require('./routes/userRoutes'));       // was './routes/users'
app.use('/api/auth', require('./routes/authRoutes'));        // was './routes/auth'
app.use('/api/tasks', require('./routes/tasks'));            // ✅ exists
app.use('/api/projects', require('./routes/projects'));      // ✅ exists

// Static assets for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Share io instance with app
app.set('io', io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = { app, io };
