const express = require('express');
const Event = require('../models/event.model');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Create event
router.post('/', (req, res) => {
  try {
    const { name, description, date, time, category, reminder } = req.body;
    
    if (!name || !date || !time || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const event = Event.create({
      name,
      description,
      date,
      time,
      category,
      userId: req.user.id,
      reminder
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Get all events for user
router.get('/', (req, res) => {
  try {
    const events = Event.findByUserId(req.user.id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get upcoming events
router.get('/upcoming', (req, res) => {
  try {
    const events = Event.getUpcomingEvents(req.user.id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming events' });
  }
});

// Get events by category
router.get('/category/:category', (req, res) => {
  try {
    const events = Event.findByCategory(req.user.id, req.params.category);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events by category' });
  }
});

// Update event
router.put('/:id', (req, res) => {
  try {
    const { name, description, date, time, category, reminder } = req.body;
    const event = Event.update(parseInt(req.params.id), req.user.id, {
      name,
      description,
      date,
      time,
      category,
      reminder
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete event
router.delete('/:id', (req, res) => {
  try {
    const success = Event.delete(parseInt(req.params.id), req.user.id);
    
    if (!success) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router; 