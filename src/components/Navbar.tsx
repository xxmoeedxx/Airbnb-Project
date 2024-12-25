import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Hamburger menu icon
import { AiOutlineUser } from 'react-icons/ai'; // User icon for Login/Signup
import { Link } from 'react-router-dom'; // Using Link for internal navigation
import useAuth from '../components/useAuth';
import Logout from './Logout';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-red-500">

            <img src="src/assets/Airbnb_icon.png" alt="Airbnb Logo" className="h-8 w-8 mr-2" />
            airbnb

          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-red-500 hover:underline transition">
            Home
          </Link>
          {user && user.role === 'admin' ? <Link to="/all-bookings" className="text-gray-700 hover:text-red-500 hover:underline transition">
            All Bookings
          </Link> : null}
          
          {user && user.role === 'user' ? (
          <Link to='my-bookings' className="text-gray-700 hover:text-red-500 hover:underline transition">
            My Bookings
          </Link>): null}

          {user && user.role === 'admin' ? (
            <Link to="/new-listing" className="text-gray-700 hover:text-red-500 hover:underline transition">
              Add New Listing
            </Link>) : null}

        </div>

        {/* User Menu */}
        {user ? (
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
                aria-label="User menu"
              >
                <AiOutlineUser size={24} className="text-gray-600 hover:text-red-500 transition" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md items-center justify-between text-center shadow-lg px-2 py-1">
                  <Logout />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition">
              Login / Signup
            </Link>
          </div>
        )}


        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 px-4 py-2 bg-white`}
      >
        <Link to="/" className="block py-2 text-gray-700 hover:text-red-500 hover:underline transition">
          Home
        </Link>
        {user && user.role === 'admin' ? (
          <Link to="/all-bookings" className="block py-2 text-gray-700 hover:text-red-500 hover:underline transition">
            All Bookings
          </Link>
        ) : null}
        {user && user.role === 'user' ? (
          <Link to="/my-bookings" className="block py-2 text-gray-700 hover:text-red-500 hover:underline transition">
            My Bookings
          </Link>
        ) : null}
        {user && user.role === 'admin' ? (
          <Link to="/new-listing" className="block py-2 text-gray-700 hover:text-red-500 hover:underline transition">
            Add New Listing
          </Link>
        ) : null}
        {user ? (
          <Logout />
        ) : (
          <Link to="/login" className="block w-full mt-4 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition">
            Login / Signup
          </Link>
        )}
      </div>
     
    </nav>
  );
};

export default Navbar;
