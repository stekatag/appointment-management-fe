# Barbershop Management System

Welcome to the Barbershop Management System, a web application designed to help barbershops manage appointments, barbers, and customer reviews efficiently. This project includes both a frontend and a backend, deployed separately, to offer a complete management solution.

## Table of Contents

- [Barbershop Management System](#barbershop-management-system)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
    - [Proposed Features](#proposed-features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)
  - [Deployment](#deployment)
    - [Steps for Deployment](#steps-for-deployment)
  - [API Documentation](#api-documentation)
  - [Troubleshooting](#troubleshooting)
    - [Handling API Downtime](#handling-api-downtime)
    - [Common Issues](#common-issues)
  - [Contributing](#contributing)
  - [License](#license)

## Demo

Check out the live demo of the application:

- **Frontend**: [Barbershop Management System](https://appointment-management-fe.vercel.app/)
- **Backend Repository**: [Barbershop API](https://github.com/stekatag/barbershop-api)

> **Note**: The backend API is deployed on a free-tier service, which may go to sleep after periods of inactivity. If the API is asleep, the frontend will show a notification allowing you to wake the server manually.

## Features

- **User Authentication**: Secure login and registration for users, barbers, and admins.
- **Appointment Management**: Users can book appointments with specific barbers and choose from various services.
- **Barber Management**: Admins can manage barber profiles, assign services, and handle appointments.
- **Service Management**: Admins can create, update, and delete services offered by the barbershop.
- **Review System**: Customers can leave reviews for barbers and services after their appointments.
- **Responsive Design**: The frontend is designed to be fully responsive, ensuring a seamless experience on both mobile and desktop devices.
- **Error Handling**: Graceful handling of server downtimes with user notifications.

### Proposed Features

- **Forgot Password**: Add a forgot password feature to reset user passwords via email. ✅
- **Email and in-app notifications**: Send email and in-app notifications for appointment reminders and confirmations. ✅
- **PWA Support**: Add support for Progressive Web Apps to enable offline access and push notifications. ✅

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management for managing the app's global state.
- **MUI (Material-UI)**: Component library for building the user interface.
- **React Hook Form**: Library for handling form validations and submissions.
- **Yup**: Schema builder for validating forms.

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: Token-based authentication.
- **Render.com**: Cloud service for deploying the backend API.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **MongoDB**: Running locally or in the cloud (e.g., MongoDB Atlas)

### Installation

1. **Clone the backend repository**:

   ```bash
   git clone https://github.com/stekatag/barbershop-api.git
   cd barbershop-api
   ```

2. **Clone the frontend repository**:

   ```bash
   git clone https://github.com/stekatag/appointment-management-fe.git
   ```

3. **Install dependencies**

   ```bash
   # Backend

   cd barbershop-api
   yarn install # recommended for the backend

   # Frontend

   cd appointment-management-fe
   npm install
   ```

### Running Locally

1. **Backend**:

   - Create a `.env` file in the `barbershop-api` directory (from the barbershop-api repository) with the following variables:

     ```bash
     PORT=3000
     MONGODB_URL=mongodb://localhost:27017/barbershop
     BASE_API_URL=your_production_api_url
     JWT_SECRET=your_jwt_secret

     # For more .env variables, check the .env.example file in the backend repository.
     ```

   - Start the backend server:

     ```bash
     npm run dev
     ```

2. **Frontend**:

   - Create a `.env` file in the `appointment-management-fe` directory or copy the `.env.example` file:

     ```bash
      # Use your own API URL for the VITE_API_URL variable. If you started the barbershop API locally, you can use the second line. If you deployed the API to another service, replace the URL with the correct one.
      VITE_API_URL="http://localhost:3000/v1"

      # Use your own VAPID key for the VITE_PUBLIC_VAPID_KEY variable. You can generate a new key pair using the web-push-libs library. The key pair is used to send push notifications to the client. You can use the following command to generate a new key pair:
      VITE_PUBLIC_VAPID_KEY="your_vapid_key"
     ```

   - Start the frontend application:

     ```bash
     npm start
     ```

   The frontend should now be running on `http://localhost:5173`.

## Deployment

The backend is currently deployed on [Render.com](https://render.com). The frontend can be deployed on platforms like Netlify, Vercel, or any other static hosting provider.

### Steps for Deployment

1. **Backend**: Push your backend code to a GitHub repository. Connect your Render account to the repository and deploy the application. Set the necessary environment variables on Render.
2. **Frontend**: Build the frontend using `npm run build`. Deploy the `build` folder to your preferred static hosting provider.

## API Documentation

API documentation is available and can be accessed through the Swagger UI (only available when the development server is running):

- **Swagger UI**: [http://localhost:3000/v1/docs](http://localhost:3000/v1/docs)

## Troubleshooting

### Handling API Downtime

If the backend API is asleep (due to the free plan on Render.com), the UI will notify users and provide an option to wake up the server. This is done by visiting a health check route that triggers the server to wake up.

### Common Issues

- **403 Forbidden**: Ensure that you have the correct permissions and are logged in with a valid token.
- **Server Downtime**: The free tier of Render.com may cause the server to sleep after inactivity. Waking it up via the provided UI option should resolve the issue.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any features or bug fixes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
