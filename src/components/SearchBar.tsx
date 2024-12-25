import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaSearch } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchBarProps {
    onSearch: (searchParams: { title: string; checkInDate: Date | null; checkOutDate: Date | null; guests: number }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  // State to manage search bar visibility (for small screens)
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // States for the form inputs
  const [title, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    //console.log(`Location: ${title}, Check-In: ${checkInDate}, Check-Out: ${checkOutDate}, Guests: ${guests}`);

    onSearch({
      title,
      checkInDate,
      checkOutDate,
      guests,
    });

  };

  // Detect if the screen is desktop size to show the expanded search bar by default
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Using 768px as the breakpoint for 'md'
    };

    // Call once on component mount
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle the visibility of the search bar (for mobile view)
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Compact Search Bar Button for Mobile View (Unexpanded) */}
      {!isDesktop && (
        <button
          onClick={toggleVisibility}
          className={`bg-white shadow-md p-4 rounded-full flex items-center justify-between border border-gray-300 w-full md:max-w-xs mx-auto 
          ${!isVisible ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : 'hidden'}`} // Hidden when expanded
        >
          {/* Search Icon */}
          <FaSearch className="text-gray-500 ml-4" />

          {/* Compact Placeholder Text */}
          <div className="flex-grow flex items-center justify-between px-4">
            <span className="text-gray-600">Where to? · Any week · Add guests</span>
          </div>
        </button>
      )}

      {/* Expanded Search Bar */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isDesktop || isVisible ? 'max-h-screen' : 'max-h-0'
        }`}
        style={{ transitionProperty: 'max-height' }} // Animation for height change
      >
        {(isDesktop || isVisible) && (
          <div className="bg-white shadow-md rounded-xl px-5 py-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-full mx-auto border border-gray-300 mt-4">
            
            {/* Location Input */}
            <div className="w-full md:flex-grow">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Search destinations"
                value={title}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Check-In Date Picker */}
            <div className="w-full md:w-auto">
              <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Check-in</label>
              <DatePicker
                id="checkInDate"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Add date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                dateFormat="MMM d, yyyy"
              />
            </div>

            {/* Check-Out Date Picker */}
            <div className="w-full md:w-auto">
              <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Check-out</label>
              <DatePicker
                id="checkOutDate"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                placeholderText="Add date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                dateFormat="MMM d, yyyy"
              />
            </div>

            {/* Guests Selector */}
            <div className="w-full md:w-auto">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2 text-lg"
              >
                <FaSearch size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        )}

        {/* Up Arrow for Collapsing (on mobile) */}
        {isVisible && !isDesktop && (
          <div className="flex justify-center mt-4">
            <button
              onClick={toggleVisibility}
              className="text-gray-500 text-lg hover:text-gray-700 transition-colors duration-500"
            >
              ▲ Hide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
