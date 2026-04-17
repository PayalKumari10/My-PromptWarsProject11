require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const roadmapRoutes = require('./routes/roadmap');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);

// Serve Static Frontend inside Production
const path = require('path');
const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));
app.use((req, res) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(staticPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start the server FIRST to ensure Cloud Run registers container as healthy
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on host 0.0.0.0 and port ${PORT}`);
});

// Attempt MongoDB Connection asynchronously
if (!process.env.MONGODB_URI) {
  console.error("WARNING: MONGODB_URI is not defined.");
} else {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
}
