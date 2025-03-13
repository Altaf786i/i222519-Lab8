# Event Planning and Reminder System

A Node.js application that serves as an event planning and reminder system. Users can create events, categorize them, set reminders, and receive notifications.

## Features

- User Authentication
- Event Creation and Management
- Event Categorization
- Reminder System
- View Events by Date, Category, or Reminder Status
- Automated Testing with GitHub Actions

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   JWT_SECRET=your-secret-key
   ```

## Running the Application

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Events
- POST `/api/events` - Create a new event
- GET `/api/events` - Get all events for the authenticated user
- GET `/api/events/upcoming` - Get upcoming events
- GET `/api/events/category/:category` - Get events by category
- PUT `/api/events/:id` - Update an event
- DELETE `/api/events/:id` - Delete an event

## Event Object Structure

```json
{
  "name": "Event Name",
  "description": "Event Description",
  "date": "2024-03-20",
  "time": "14:00",
  "category": "Meeting",
  "reminder": 30
}
```

## Testing

Run the test suite:
```bash
npm test
```

## GitHub Actions

The project includes automated testing with GitHub Actions. Tests are run automatically on:
- Push to main branch
- Pull request to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 