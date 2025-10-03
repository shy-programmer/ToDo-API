const express = require('express');
const app = express();
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


module.exports = app