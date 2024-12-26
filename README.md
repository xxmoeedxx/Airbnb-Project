# Responsive Travel Search Web Application

## Project Overview

This project is an **Airbnb Clone Application** built using **React**, **Tailwind CSS**, and **Node.js** with **MongoDB** for the backend. The application features a comprehensive search bar that allows users to enter a location, check-in/check-out dates, and the number of guests. The primary use case is for travel booking platforms or applications, similar to Airbnb or Booking.com.

The search bar's design is mobile-first, providing a simplified, compact view for smaller screens and an expanded, full-featured view for desktop users. The application uses **smooth animations** for transitions between states, ensuring a seamless and user-friendly experience.

### Key Features:
- **Responsive Design**: Mobile and desktop layouts using Tailwind CSS, with a dynamic search bar that adapts to screen sizes.
- **Date Selection**: Integrated date pickers (via `react-datepicker`) for choosing check-in and check-out dates.
- **Guest Selection**: Dropdown for selecting the number of guests.
- **Smooth Animations**: The transition between expanded and collapsed states is animated for improved user experience.
- **Search Action**: Upon form submission, the selected data is logged for future integration with backend services or APIs.
- **Backend Integration**: Node.js and MongoDB for handling user data and search queries.
- **Admin Panel**: Admin interface for managing listings and user data.

---

## Setup Instructions

### Prerequisites:
- **Node.js**: Ensure that you have Node.js installed on your machine (version 14.x or higher recommended).
- **npm or yarn**: Make sure you have either npm (comes with Node.js) or yarn as a package manager.
- **MongoDB**: Install MongoDB and ensure it is running on your machine.

### 1. Clone the Repository:
```bash
git clone https://github.com/xxmoeedxx/Airbnb-Project.git
cd Airbnb-Project
```

### 2. Install Dependencies:
Install all the required project dependencies with npm:

Using npm:
```bash
npm install
```

Do it for backend directory as well.

```bash
cd airbnb-backend
npm install
```

### 3. Setup Environment Variables:
Create a `.env` file in the `airbnb-backend` directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the Backend:
Start the backend server using npm or yarn:

Using npm:
```bash
npm run server.js
```

### 5. Run the Frontend:
In a new terminal, start the frontend development server:

Using npm:
```bash
npm run dev
```

---

## API Documentation

### Endpoints:

#### GET /api/listings
- **Description**: Fetch all listings.
- **Response**: JSON array of listings.

#### POST /api/listings
- **Description**: Create a new listing.
- **Request Body**: JSON object with listing details.
- **Response**: JSON object of the created listing.

#### GET /api/listings/:id
- **Description**: Fetch a single listing by ID.
- **Response**: JSON object of the listing.

#### DELETE /api/listings/:id
- **Description**: Delete a listing by ID.
- **Response**: Success message.
#### GET /api/bookings
- **Description**: Fetch all bookings.
- **Response**: JSON array of bookings.

#### POST /api/bookings
- **Description**: Create a new booking.
- **Request Body**: JSON object with booking details.
- **Response**: JSON object of the created booking.

#### GET /api/bookings/:id
- **Description**: Fetch a single booking by ID.
- **Response**: JSON object of the booking.

### Admin Panel Access:
- **URL**: `/admin`
- **Description**: Access the admin panel to manage listings and user data.
- **Authentication**: Admin login required.

---

## Future Improvements

- **Error Handling**: Add validation and error-handling for user inputs, such as checking if both check-in and check-out dates are provided.
- **Role-Based Registration**: Implement user roles such as guests and hosts, allowing different access levels and functionalities.
- **Host Functionality**: Enable hosts to create, update, and manage their property listings, including availability and pricing.
- **More Filters**: Add more search options like property type, price range, and location radius for a more comprehensive search experience.
- **Testing**: Implement unit and integration tests using a framework like **Jest** or **React Testing Library** for component validation and future updates.
- **Accessibility Improvements**: Make sure the search bar meets accessibility standards, such as keyboard navigation and screen reader compatibility.

---

## Technologies Used

- **React**: A popular JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Node.js**: JavaScript runtime for building the backend.
- **MongoDB**: NoSQL database for storing application data.
- **react-datepicker**: A lightweight date picker library for React.
- **react-icons**: For adding icons in a simple and customizable way.
- **TypeScript**: For building interactive components.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the project as needed and build more advanced features upon this foundational code!

---