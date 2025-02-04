import { useEffect, useState } from 'react';
import useAuth from '../components/useAuth';
import Navbar from '../components/Navbar';

interface Booking {
  id: number;
  listingId: number;
  listingTitle: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Fetch bookings from backend
    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://airbnb-backend-dz76.onrender.com/api/bookings/user/${user?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError('Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
    <Navbar></Navbar>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-red-500 mb-6">My Bookings</h1>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              {/* <h2 className="text-xl font-bold text-gray-800">Property ID: {booking.listingId}</h2> */}
              <h3 className="text-lg font-semibold text-gray-700">{booking.listingTitle}</h3>
              <p className="text-gray-600">
                Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Guests: {booking.guests}</p>
              <p className="text-gray-600">Total Price: ${booking.totalPrice}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no current bookings.</p>
      )}
    </div>
  </div>
  );
};

export default MyBookings;