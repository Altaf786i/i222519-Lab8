const cron = require('node-cron');
const Event = require('../models/event.model');

// In a real application, this would send actual notifications
// For this demo, we'll just log to console
const sendNotification = (event) => {
  console.log(`REMINDER: Event "${event.name}" is starting in ${event.reminder} minutes!`);
  console.log(`Details: ${event.description}`);
  console.log(`Time: ${event.date} ${event.time}`);
  console.log(`Category: ${event.category}`);
};

const checkReminders = () => {
  const now = new Date();
  const events = Event.getAll();

  events.forEach(event => {
    if (!event.reminder) return;

    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const reminderTime = new Date(eventDateTime.getTime() - event.reminder * 60000);

    // Check if it's time to send a reminder
    if (Math.abs(now - reminderTime) < 60000) { // Within 1 minute
      sendNotification(event);
    }
  });
};

const initializeReminderService = () => {
  // Check for reminders every minute
  cron.schedule('* * * * *', checkReminders);
  console.log('Reminder service initialized');
};

module.exports = {
  initializeReminderService
}; 