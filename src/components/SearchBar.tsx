// src/components/SearchBar.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaSearch } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log(`Location: ${location}, Check-In: ${checkInDate}, Check-Out: ${checkOutDate}, Guests: ${guests}`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl md:rounded-full px-5 md:py-2 py-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-full md:max-w-4xl mx-auto border border-gray-300">
      
      {/* Location Input */}
      <div className="w-full md:flex-grow">
        <label htmlFor="location" className="block text-sm px-2 font-medium text-gray-700">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Search destinations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 rounded-lg md:rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Check-In Date Picker */}
      <div className="w-full md:w-auto">
        <label htmlFor="checkInDate" className="block text-sm px-2 font-medium text-gray-700">Check-in</label>
        <DatePicker
          id="checkInDate"
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholderText="Add date"
          className="w-full p-2 md:rounded-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          dateFormat="MMM d, yyyy"
        />
      </div>

      {/* Check-Out Date Picker */}
      <div className="w-full md:w-auto">
        <label htmlFor="checkOutDate" className="block text-sm px-2 font-medium text-gray-700">Check-out</label>
        <DatePicker
          id="checkOutDate"
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholderText="Add date"
          className="w-full p-2 md:rounded-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          dateFormat="MMM d, yyyy"
        />
      </div>

      {/* Guests Selector */}
      <div className="w-full md:w-auto">
        <label htmlFor="guests" className="block text-sm px-2 font-medium text-gray-700">Guests</label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full p-2 md:rounded-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-red-500 text-white p-3 rounded-lg md:rounded-full hover:bg-red-600 flex items-center justify-center space-x-2 text-lg"
        >
          <FaSearch size={20} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
