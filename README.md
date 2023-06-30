# Attendance Management

Attendance management app with REST API in Node.js and React frontend.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment](#environment)
- [Usage](#usage)
- [Tests](#tests)

## Project Description

A full-stack application for attendance management. REST API with CRUD operations and Excel batch creation. React frontend for intuitive user interface. Efficiently track and manipulate attendance records

## Technologies Used

List the main technologies, libraries, and dependencies used in both the frontend and backend:

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Jest (for testing)
  - TypeScript
- Frontend:
  - React
  - React Router
  - Redux Toolkit
  - MUI (Material-UI)

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/JFernando12/gestion-asistencias
  ```

2. Copy code:

  ```bash
  cd gestion-asistencias
  ```

3. Install the backend dependencies:

  ```bash
  cd backend
  npm install
  ```

4. Compile and build the backend:

  ```bash
  cd backend
  npm run build
  ```

4. Install the frontend dependencies:

  ```bash
  cd frontend
  npm install
  ```

## Environment

1. Create the following variables inside .env in backend folder:

  ```bash
  PORT=3000
  MONGO_URI=mongodb://username:password@host:port/database
  ```

2. Create the following variables inside .env in frontend folder:

  ```bash
  PORT=5000
  REACT_APP_API_URL=http://localhost:3000/api
  ```

## Usage

1. Start the backend server:

  ```bash
  cd backend
  npm start
  ```

2. Start the frontend development server:

  ```bash
  cd frontend
  npm start
  ```

Access the application in your browser at http://localhost:5000.

## Testing

To run tests for the backend:
  
  ```bash
  cd backend
  npm run test
  ```