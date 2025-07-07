# Instagram Clone

A full-stack Instagram clone built with React (frontend) and Spring Boot (backend) and MYSQL (Database).

## Features

- User profile with photo and username
- Create, view, and delete posts
- Follow/unfollow users
- Story feature (add/view stories)
- Suggestions for new users to follow
- Dark and light theme toggle

## Getting Started

### Prerequisites

- Node.js and npm
- Java 17+ and Maven
- MySQL

### Backend Setup

1. Go to `Instagram-backend` directory.
2. Configure your MySQL credentials in `src/main/resources/application.properties`.
3. Run the backend:

   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Go to `Instagram-frontend/Instagram-clone` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Register or use the default profile.
- Create posts and stories.
- Follow/unfollow users.
- Switch between dark and light themes from the sidebar.

## Project Structure

- **Instagram-backend**: Spring Boot REST API, MySQL database.
- **Instagram-frontend/Instagram-clone**: React app using Vite.

## License

This project is for educational/demo purposes only.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


