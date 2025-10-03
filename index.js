require('dotenv').config();
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

const app = require('./app');
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

