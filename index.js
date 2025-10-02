const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./users/users.route');
const taskRoutes = require('./tasks/tasks.route');

// Middleware to parse JSON requests
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);


// Home page
app.get('/', (req, res) => {
  res.send('Welcome to my ToDo API');
}
);

// Wrong endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});