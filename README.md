# City Ambient Soundscape Mixer - Backend

A Node.js/Express.js backend API with MongoDB integration for the City Ambient Soundscape Mixer application.

## Features

- **RESTful API**: Endpoints for user authentication and soundscape management
- **MongoDB Integration**: Database storage for user accounts and saved soundscapes
- **JWT Authentication**: Secure user sessions with JSON Web Tokens
- **TypeScript**: Type-safe backend implementation

## Technology Stack

- **Node.js** with **Express.js** framework
- **TypeScript** for type safety
- **MongoDB** for data persistence
- **Mongoose** for MongoDB object modeling
- **JWT** for authentication
- **Bcryptjs** for password hashing

## API Endpoints

### Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Authenticate a user and receive a JWT token

### Soundscapes
- `GET /soundscape` - Get all soundscapes for the authenticated user
- `GET /soundscape/:id` - Get a specific soundscape
- `POST /soundscape` - Create a new soundscape
- `PATCH /soundscape/:id` - Update an existing soundscape
- `DELETE /soundscape/:id` - Delete a soundscape

## Data Models

### User
```typescript
{
  _id: ObjectId,
  username: string,
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Soundscape
```typescript
{
  _id: ObjectId,
  name: string,
  user: ObjectId (reference to User),
  sounds: [
    {
      id: string,  // e.g., "Light Traffic"
      volume: number  // 0 to 1
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/neethuss/CitySoundscape-backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/city-soundscape
   # Or your MongoDB Atlas connection string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

5. The API will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
# or with yarn
yarn build
```

The built files will be in the `dist` directory.

## Running in Production

```bash
npm run start
# or with yarn
yarn start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── interface/      # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Server entry point
```

## Database Setup

### Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service
3. The application will connect to the database specified in your MONGODB_URI

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Set up a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string and update the MONGODB_URI in your .env file

## Deployment

The backend API is currently deployed at: https://citysoundscape-backend.onrender.com
