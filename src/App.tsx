import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ListingDetails from './pages/ListingDetails';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import AllBookings from './pages/AllBookings';
import NewListing from './pages/NewListing';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-bookings"
            element={
              <AdminRoute>
                <AllBookings />
              </AdminRoute>
            }
          />
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/new-listing" element={<NewListing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
