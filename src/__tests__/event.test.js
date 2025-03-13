const Event = require('../models/event.model');

describe('Event Model', () => {
  beforeEach(() => {
    // Clear all events before each test
    Event.getAll().length = 0;
  });

  test('should create a new event', () => {
    const eventData = {
      name: 'Test Event',
      description: 'Test Description',
      date: '2024-03-20',
      time: '14:00',
      category: 'Meeting',
      userId: 1,
      reminder: 30
    };

    const event = Event.create(eventData);

    expect(event.name).toBe(eventData.name);
    expect(event.description).toBe(eventData.description);
    expect(event.date).toBe(eventData.date);
    expect(event.time).toBe(eventData.time);
    expect(event.category).toBe(eventData.category);
    expect(event.userId).toBe(eventData.userId);
    expect(event.reminder).toBe(eventData.reminder);
  });

  test('should find events by user ID', () => {
    const userId = 1;
    const event1 = Event.create({
      name: 'Event 1',
      date: '2024-03-20',
      time: '14:00',
      category: 'Meeting',
      userId
    });

    const event2 = Event.create({
      name: 'Event 2',
      date: '2024-03-21',
      time: '15:00',
      category: 'Birthday',
      userId
    });

    const userEvents = Event.findByUserId(userId);
    expect(userEvents).toHaveLength(2);
    expect(userEvents).toContainEqual(event1);
    expect(userEvents).toContainEqual(event2);
  });

  test('should find events by category', () => {
    const userId = 1;
    const category = 'Meeting';

    Event.create({
      name: 'Meeting 1',
      date: '2024-03-20',
      time: '14:00',
      category,
      userId
    });

    Event.create({
      name: 'Birthday 1',
      date: '2024-03-21',
      time: '15:00',
      category: 'Birthday',
      userId
    });

    const categoryEvents = Event.findByCategory(userId, category);
    expect(categoryEvents).toHaveLength(1);
    expect(categoryEvents[0].category).toBe(category);
  });

  test('should get upcoming events', () => {
    const userId = 1;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    Event.create({
      name: 'Past Event',
      date: yesterdayStr,
      time: '14:00',
      category: 'Meeting',
      userId
    });

    const upcomingEvent = Event.create({
      name: 'Future Event',
      date: tomorrowStr,
      time: '15:00',
      category: 'Meeting',
      userId
    });

    const upcomingEvents = Event.getUpcomingEvents(userId);
    expect(upcomingEvents).toHaveLength(1);
    expect(upcomingEvents[0]).toEqual(upcomingEvent);
  });
}); 