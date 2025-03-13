// In-memory storage for events
const events = [];
let nextEventId = 1;

class Event {
  constructor(name, description, date, time, category, userId, reminder) {
    this.id = nextEventId++;
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
    this.category = category;
    this.userId = userId;
    this.reminder = reminder; // minutes before event
    this.createdAt = new Date();
  }

  static create(eventData) {
    const event = new Event(
      eventData.name,
      eventData.description,
      eventData.date,
      eventData.time,
      eventData.category,
      eventData.userId,
      eventData.reminder
    );
    events.push(event);
    return event;
  }

  static findById(id) {
    return events.find(event => event.id === id);
  }

  static findByUserId(userId) {
    return events.filter(event => event.userId === userId);
  }

  static findByCategory(userId, category) {
    return events.filter(event => event.userId === userId && event.category === category);
  }

  static getAll() {
    return this.events;
  }

  static getUpcomingEvents(userId) {
    const now = new Date();
    return events
      .filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        return event.userId === userId && eventDate > now;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
  }

  static delete(id, userId) {
    const index = events.findIndex(event => event.id === id && event.userId === userId);
    if (index !== -1) {
      events.splice(index, 1);
      return true;
    }
    return false;
  }

  static update(id, userId, updateData) {
    const event = events.find(event => event.id === id && event.userId === userId);
    if (event) {
      Object.assign(event, updateData);
      return event;
    }
    return null;
  }
}

module.exports = Event; 
