import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const BookingPage = () => {
  const { id } = useParams();
  const query = useQuery();
  const title = query.get('title');
  const price = query.get('price');
  const [checkInDate, setCheckIn] = useState('');
  const [checkOutDate, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listingTitle, setListingTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    listingId: parseInt(id || '0'),
    checkInDate: '',
    checkOutDate: '',
    guests: 0,
    totalPrice: 0,
    listingTitle: '',
  });

  useEffect(() => {
    console.log('id:', id);
    console.log('title:', title);
    console.log('price:', price);
    const perNightPrice = parseInt(price || '0');
    const checkIn = new Date(checkInDate).getTime();
    const checkOut = new Date(checkOutDate).getTime();
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const total = perNightPrice * nights * guests;
    setTotalPrice(total);
    setListingTitle(title || '');
    setBookingData({
      listingId: parseInt(id || '0'),
      checkInDate,
      checkOutDate,
      guests,
      totalPrice: total,
      listingTitle: title || '',
    });
    console.log(bookingData);
  }, [checkInDate, checkOutDate, guests, id, price, title]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();   


    try {
      // Send the booking data to the backend
      console.log(bookingData);
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage('Booking created successfully!');
        setCheckIn('');
        setCheckOut('');
        setGuests(1);
        setTotalPrice(0);
        setListingTitle('');
        setBookingData({
          listingId: 0,
          checkInDate: '',
          checkOutDate: '',
          guests: 0,
          totalPrice: 0,
          listingTitle: '',
        });
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      setError('An error occurred while booking. Please try again.');
    }
  };

   return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Book Your Stay</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor='pricePerNight' className="block text-sm font-medium text-gray-700">
            Price Per Night
          </label>
          <input
            type="text"
            id="pricePerNight"
            value={`$${price}`}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
            Total Price
          </label>
          <input
            type="text"
            id="totalPrice"
            value={`$${totalPrice}`}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="listingTitle" className="block text-sm font-medium text-gray-700">
            Listing Title
          </label>
          <input
            type="text"
            id="listingTitle"
            value={listingTitle}
            onChange={(e) => setListingTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BookingPage;
