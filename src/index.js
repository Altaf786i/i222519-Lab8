const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const { initializeReminderService } = require('./services/reminder.service');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Initialize reminder service
initializeReminderService();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 