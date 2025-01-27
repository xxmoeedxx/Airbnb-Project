import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import useAuth from '../components/useAuth';

// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookingPage = () => {
  const { id } = useParams();
  const query = useQuery();
  const {user} = useAuth();
  const title = query.get('title');
  const price = query.get('price');
  const navigate = useNavigate();

  const [checkInDate, setCheckIn] = useState('');
  const [checkOutDate, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listingTitle, setListingTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [bookingData, setBookingData] = useState({
    listingId: (id || '0'),
    checkInDate: '',
    checkOutDate: '',
    guests: 0,
    totalPrice: 0,
    listingTitle: '',
    userId: user?.id || null,
  });

  useEffect(() => {
    const perNightPrice = parseInt(price || '0');
    const checkIn = new Date(checkInDate).getTime();
    const checkOut = new Date(checkOutDate).getTime();
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const total = perNightPrice * nights * guests;
    setTotalPrice(total);
    setListingTitle(title || '');
    setBookingData({
      listingId: (id || '0'),
      checkInDate,
      checkOutDate,
      guests,
      totalPrice: total,
      listingTitle: title || '',
      userId: user?.id || null,
    });
  }, [checkInDate, checkOutDate, guests, id, price, title]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button
    try {
      const response = await fetch('https://airbnb-backend-dz76.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage('Booking created successfully! Redirecting...');
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      setError('An error occurred while booking. Please try again.');
      setIsSubmitting(false); // Re-enable the button in case of failure
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <BackButton className="mb-4" />
      <h1 className="text-4xl font-bold text-center mb-6 text-red-500">
        Book Your Stay
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Check-in Date */}
          <div className="flex items-center">
            <label htmlFor="checkIn" className="w-1/3 text-sm font-medium text-gray-700">
              Check-in Date:
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkInDate}
              onChange={(e) => setCheckIn(e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>

          {/* Check-out Date */}
          <div className="flex items-center">
            <label htmlFor="checkOut" className="w-1/3 text-sm font-medium text-gray-700">
              Check-out Date:
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOutDate}
              onChange={(e) => setCheckOut(e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex items-center">
            <label htmlFor="guests" className="w-1/3 text-sm font-medium text-gray-700">
              Rooms:
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>

          {/* Price per night */}
          <div className="flex items-center">
            <label htmlFor="pricePerNight" className="w-1/3 text-sm font-medium text-gray-700">
              Price/Night:
            </label>
            <input
              type="text"
              id="pricePerNight"
              value={`$${price}`}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100"
              readOnly
            />
          </div>

          {/* Total Price */}
          <div className="flex items-center">
            <label htmlFor="totalPrice" className="w-1/3 text-sm font-medium text-gray-700">
              Total Price:
            </label>
            <input
              type="text"
              id="totalPrice"
              value={`$${totalPrice}`}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100"
              readOnly
            />
          </div>

          {/* Listing Title */}
          <div className="flex items-center">
            <label htmlFor="listingTitle" className="w-1/3 text-sm font-medium text-gray-700">
              Listing Title:
            </label>
            <input
              type="text"
              id="listingTitle"
              value={listingTitle}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100"
              readOnly
            />
          </div>
        </div>

        <div className="text-center">
          <button
            className={`w-full py-3 rounded-lg font-bold text-white ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </form>

      {message && <p className="text-green-600 text-center mt-4">{message}</p>}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default BookingPage;
