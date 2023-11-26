# City Gazer

## Overview

City Gazer is a web application built with Next.js and React, allowing users to explore various cities and obtain detailed information including location, weather updates, photos, and more. Users can also save their favorite cities for later reference. MongoDB is used as the database for data storage.

## Features

- **City Search**: Search and retrieve detailed information about cities.
- **Weather Updates**: Real-time weather information for searched cities.
- **Image Gallery**: Access a collection of photos showcasing the cities.
- **Favorite Cities**: Ability to mark and save preferred cities for easy access.

## Technical Stack

- **Frontend**: Next.js, React, JSX, CSS
- **Database**: MongoDB

## Screenshots

1. **Landing Page**:
   ![City Search](./screenshots/landing_page.png)

2. **Home Page**:
   ![City Search](./screenshots/home_page.png)

## Setup Instructions

To run City Gazer locally, follow these steps:

1. **Clone the Repository**: Clone the City Gazer repository to your local machine.
2. **Install Dependencies**:
   - Navigate to the project directory.
   - Run `npm install` to install required dependencies.
3. **MongoDB Setup**:
   - Ensure MongoDB is installed and running.
   - Create a new MongoDB database for City Gazer **(WIP)**.
4. **Environment Variables**:
   - Create a `.env` file in the project root.
   - Add `MONGO_URI=<your_mongodb_connection_string>` to the `.env` file.
5. **Start the Development Server**:
   - Run `npm run dev` to start the Next.js development server.
6. **Explore City Gazer**:
   - Access City Gazer by visiting `http://localhost:3000` in your browser.
