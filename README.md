# Event Management Platform

A full-stack MERN application for creating and managing events with real-time updates. Users can create events, manage registrations, and track attendance in real-time.

Live Demo: [Event Management Platform](https://event-management-hadungwrabrahmas-projects.vercel.app/)

## Features

### User Authentication
- Secure registration and login system
- JWT-based authentication
- Protected routes for authenticated users

### Event Management
- Create and manage events
- Real-time updates for event attendance
- Filter events by upcoming and past dates
- Track event attendance with "Going/Not Attending" functionality

### Real-time Updates
- Socket.IO integration for live attendance updates
- Instant reflection of attendance changes across all connected clients
- Real-time event creation notifications

### Responsive Design
- Clean and intuitive user interface
- Seamless experience across all devices

## Technology Stack

### Frontend
- React.js
- React Router DOM for navigation
- Socket.IO Client for real-time features
- Axios for API requests
- Pure CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time updates
- JWT for authentication
- Bcrypt for password hashing

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Real-time: Socket.IO

## Installation and Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB
- Git

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/event-management.git
cd event-management
```

2. Backend Setup
```bash
cd event-management-backend
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# FRONTEND_URL=http://localhost:3000
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret

npm run dev
```

3. Frontend Setup
```bash
cd event-management-frontend
npm install

npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `POST /api/events/:eventId/attendance` - Toggle event attendance
- `GET /api/events/:eventId/attendance` - Get event attendance status
- `DELETE /api/events/:eventId` - Delete event

### Upload
- `POST /api/upload` - Upload image on Cloudinary

## Features in Action

### Event Creation
1. Log in to your account
2. Navigate to "Create Event"
3. Fill in event details
4. Upload image (Optional)
5. Submit to create event

### Event Attendance
1. Browse events in the dashboard
2. Click "Going" on any upcoming event
3. Track real-time attendance updates
4. Toggle attendance status as needed
5. Delete event

## Contributing

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
git commit -m 'Add amazing feature'
```
4. Push to the branch
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## Test Credentials
```
Email: test@example.com
Password: test123
```

## Future Enhancements
- Event categories and tags
- Advanced search and filtering
- Event comments and discussions
- User profiles and social features
- Email notifications
- Event location mapping

## Contact

Hadungwra Brahma - [hadungwrabrahma2@gmail.com]

Project Link: [https://github.com/yourusername/event-management](https://github.com/yourusername/event-management)

## License

N/A