import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ListingDetails from './pages/ListingDetails';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings'; // Import the new MyBookings component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/bookings" element={<MyBookings />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
