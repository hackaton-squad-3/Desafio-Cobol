# Modernized Todo Application

This project is a modernized version of a COBOL Todo Application, migrated to a Java Spring Boot backend with a React frontend.

## Project Structure

The project is divided into two main parts:

### Backend (Spring Boot)

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Security
- RESTful APIs
- H2 Database (for development)

### Frontend (React)

- React 18
- Material-UI components
- React Router for navigation
- Axios for API communication
- Date-fns for date manipulation

## Features

- User Management (CRUD operations)
  - Create, list, update, and delete users
  - Validation for user data (first name, last name, birth date)
  - Age validation (users must be at least 18 years old)

- Task Management (CRUD operations)
  - Create, list, update, and delete tasks
  - Assign tasks to users
  - Set task priorities
  - Track task status
  - Tag tasks for categorization

- Dashboard
  - Overview of users and tasks
  - Quick access to recent tasks

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js and npm
- Maven

### Running the Backend

1. Navigate to the backend directory:
   ```
   cd modernized-todo-app/backend
   ```

2. Build the project with Maven:
   ```
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

The backend will start on http://localhost:8080

### Running the Frontend

1. Navigate to the frontend directory:
   ```
   cd modernized-todo-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will start on http://localhost:3000

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get a specific task
- `GET /api/tasks/user/{userId}` - Get tasks assigned to a user
- `GET /api/tasks/tag/{tag}` - Get tasks with a specific tag
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `PATCH /api/tasks/{id}/status` - Update a task's status
- `DELETE /api/tasks/{id}` - Delete a task

## Architecture

This project follows a standard layered architecture:

1. **Frontend Layer**: React components and services
2. **API Layer**: Spring Boot REST controllers
3. **Service Layer**: Business logic implementation
4. **Repository Layer**: Data access using Spring Data JPA
5. **Database**: H2 in-memory database (can be replaced with PostgreSQL or MySQL)

## Migration Notes

This application was migrated from a COBOL application with the following changes:

- Replaced in-memory arrays with a relational database
- Converted procedural COBOL code to object-oriented Java
- Added a modern React frontend with Material-UI components
- Implemented RESTful API for communication between frontend and backend
- Enhanced validation and error handling
- Added proper date handling and formatting

## Future Improvements

- Add authentication and authorization
- Implement pagination for large datasets
- Add search functionality
- Create mobile app using React Native
- Implement email notifications for task deadlines
