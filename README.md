# PAWLOFT Website

Welcome to the PAWLOFT website repository! This project is a comprehensive full-stack application dedicated to compassionate luxury and care for pets.

## Overview

The project is structured into three main components:

- **client/**: A legacy React application (built with Vite) that served as the project's initial frontend.
- **pawloft-next/**: The newer, modernized React frontend built with Next.js 16 and Tailwind CSS.
- **server/**: The backend API built with Node.js, Express, and MongoDB, handling authentication, data storage, and business logic.

## Features

- **Modern UI**: A responsive, beautifully designed frontend using Tailwind CSS and Lucide icons.
- **Authentication**: Secure user signup and login flows powered by JWT and bcrypt.
- **Pet Care Resources**: Sections dedicated to feeding charts, first-aid, and donation drives to support animal welfare.

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB instance (local or Atlas)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saanvirajput/PAWLOFT_WEBSITE.git
   cd PAWLOFT_WEBSITE
   ```

2. **Install Top-Level Dependencies:**
   ```bash
   npm install
   ```
   *This will install `concurrently` to run multiple environments at once.*

3. **Install Component Dependencies:**
   Follow the same process for each sub-directory to install their respective requirements:
   ```bash
   cd client && npm install
   cd ../pawloft-next && npm install
   cd ../server && npm install
   cd ..
   ```

4. **Environment Variables:**
   You will need to set up environment variables in the `server` directory (e.g., `MONGO_URI`, `JWT_SECRET`). Create a `.env` file in the `server/` folder and add your specific configurations.

## Running the Application

You can start both the new Next.js frontend and the Express backend simultaneously using the provided npm scripts at the root level:

```bash
# Start both Next.js app and Express server
npm run dev

# Or to run individually:
npm run next    # Starts just the Next.js app
npm run server  # Starts just the Express server
npm run legacy-client # Starts the older Vite app
```

## Technologies Used
- Next.js (React)
- Tailwind CSS
- Node.js & Express
- MongoDB & Mongoose
- Vite (Legacy Client)
