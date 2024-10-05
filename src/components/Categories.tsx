// src/components/Categories.js
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaUmbrellaBeach, FaTree, FaFire, FaMountain, FaTractor, FaGem, FaWater, FaWineBottle, FaFortAwesome, FaSnowflake, FaCampground, FaHome, FaIgloo } from 'react-icons/fa'; // Import relevant icons

const categories = [
  { name: 'Beachfront', icon: <FaUmbrellaBeach /> },
  { name: 'Cabins', icon: <FaTree /> },
  { name: 'Trending', icon: <FaFire /> },
  { name: 'Mountain', icon: <FaMountain /> },
  { name: 'Countryside', icon: <FaTractor /> },
  { name: 'Luxe', icon: <FaGem /> },
  { name: 'Lakefront', icon: <FaWater /> },
  { name: 'Vineyards', icon: <FaWineBottle /> },
  { name: 'Castles', icon: <FaFortAwesome /> },
  { name: 'Caves', icon: <FaMountain /> },
  { name: 'Tiny Homes', icon: <FaHome /> },
  { name: 'Domes', icon: <FaIgloo /> },
  { name: 'Arctic', icon: <FaSnowflake /> },
  { name: 'Camping', icon: <FaCampground /> },
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

  // Function to scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -500, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  }


  return (
    <div className="relative w-full flex items-center px-8">
      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg focus:outline-none">
        <FaChevronLeft />
      </button>

      {/* Category list */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden space-x-4 px-4 py-4 scroll-smooth">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-center space-x-2 px-2 py-0.5 rounded-lg transition-colors duration-300 ${
              activeCategory === category.name
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCategory(category.name)}>
            <span className="text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg focus:outline-none">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Categories;
