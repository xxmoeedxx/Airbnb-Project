import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importing hamburger menu icon
import { AiOutlineUser } from 'react-icons/ai'; // Importing user icon for Login/Signup

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center">
            <a href="/" className="flex items-center text-2xl font-bold text-red-500">
              <img src="src/assets/Airbnb_icon.png" alt="Airbnb Logo" className="h-8 w-8 mr-2" />
              airbnb
            </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:underline">Home</a>
          <a href="/experiences" className="hover:underline">Experiences</a>
          <a href="/online-experiences" className="hover:underline">Online Experiences</a>
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <AiOutlineUser size={24} className="text-gray-600" />
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Login / Signup
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-4 py-2 bg-white`}>
        <a href="/" className="block py-2 hover:underline">Home</a>
        <a href="/experiences" className="block py-2 hover:underline">Experiences</a>
        <a href="/online-experiences" className="block py-2 hover:underline">Online Experiences</a>
        <button className="block w-full mt-4 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
          Login / Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
