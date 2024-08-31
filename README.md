# Real-Time Collaborative Whiteboard

A React-based real-time collaborative whiteboard application that allows multiple users to draw, edit, and interact simultaneously. The application uses WebSockets for real-time communication and state synchronization across users.

## Features

- Real-time drawing and editing on an HTML5 canvas.
- WebSocket-based synchronization for collaborative editing.
- Display of active users.
- Scalability and performance optimization.

## Technologies Used

- React.js
- WebSocket (Socket.IO or native WebSocket API)
- HTML5 Canvas
- Node.js and Express (for backend)
- CSS/SCSS for styling

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/collaborative-whiteboard.git
   cd collaborative-whiteboard

2. Install the dependencies:

   ```bash

   npm install

3. Start the development server:

   ```bash

   npm start

4. Start the backend server (if applicable):

   ```bash

   cd server
   npm install
   npm start

5. Open your browser and navigate to http://localhost:3000.

# Implementation Details

## 1. Setting Up Real-Time WebSocket Connection

WebSocket connections are established using libraries like Socket.IO or the native WebSocket API. The WebSocket connection is initialized in a React component using useEffect to handle real-time communication.

## 2. Drawing Functionality on HTML5 Canvas

Drawing functionality is implemented on an HTML5 canvas using React refs and event listeners for mouse and touch events. The Canvas component manages the drawing context and state.

## 3. Synchronizing Canvas State

Canvas state is synchronized across users by broadcasting drawing data over WebSocket. On receiving data, each client updates its canvas accordingly.

## 4. Handling Active Users

Active users are displayed using a simple list managed by the WebSocket server. The server tracks connected clients and broadcasts updates to all users.

## 5. Scalability and Performance

To ensure scalability and performance, the backend server is optimized for handling concurrent WebSocket connections using clustering techniques or load balancing.

