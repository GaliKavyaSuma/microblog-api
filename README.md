# Microblogging API

A simple microblogging API built with Node.js, Express.js, and SQLite.

## Features

- User Signup & Login with JWT authentication
- Create, Read, Update, Delete posts
- Like/Unlike posts
- SQLite database (file-based, no server setup)
- Free deployment on Render.com

## Tech Stack

- Backend: Node.js + Express.js
- Database: SQLite
- Deployment: Render.com
- Testing: Postman
- Version Control: GitHub

## Endpoints

- POST `/api/users/signup` → register
- POST `/api/users/login` → login
- POST `/api/posts/create` → create post
- GET `/api/posts` → get all posts
- GET `/api/posts/:id` → get single post
- PUT `/api/posts/:id` → update post
- DELETE `/api/posts/:id` → delete post
- POST `/api/posts/:id/like` → like/unlike post

## How to Run Locally

1. `npm install`  
2. `node server.js`  
3. Use Postman to test endpoints
