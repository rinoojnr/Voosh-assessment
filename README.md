# Voosh Assessment

## Description
This assessment implements user authentication and profile management endpoints using Node.js and MongoDB. Users can sign up, log in, log out, edit their profiles, and upload profile pictures.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up environment variables for MongoDB connection, session secret, and any other required variables.
5. Start the server by running `npm start`.

## Usage
- **Signup**: Users can register by providing a unique username, email, phone number, and password.
- **Login**: Registered users can log in using their email and password.
- **Logout**: Users can log out, terminating their session.
- **Profile Editing**: Users can edit their profile information including username, email, phone number, password, bio, and profile picture.
- **Profile Picture Editing**: Users can upload a new profile picture.
- **Admin Access**: Admin users have access to view all user profiles, including private ones.
- **Public Profile**: Users can choose to make their profile public or private. Only public profiles are visible to non-admin users.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- bcrypt for password hashing
- JSON Web Token (JWT) for authentication
- AWS S3 for image storage
- Passport.js with GitHub Authentication
- Express-session for session management

## API Endpoints
1. **POST /signup**: Register a new user.
2. **POST /login**: Log in an existing user.
3. **POST /logout**: Log out the current user.
4. **PUT /edit-profile**: Edit user profile information.
5. **PUT /edit-profile-picture**: Edit user profile picture.
6. **GET /show-profile**: View user profile.
7. **GET /show-all-profiles**: View all user profiles (admin only).

