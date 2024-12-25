// src/components/Categories.js
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaUmbrellaBeach, FaTree, FaFire, FaMountain, FaTractor, FaGem, FaWater, FaWineBottle, FaFortAwesome, FaSnowflake, FaCampground, FaHome, FaIgloo, FaBuilding, FaLandmark, FaWarehouse, FaStar } from 'react-icons/fa'; // Import relevant icons

const categories = [
  {name: 'All', icon: <FaStar />},
  { name: 'Castles', icon: <FaFortAwesome /> },
  { name: 'House', icon: <FaHome /> },
  { name: 'Loft', icon: <FaBuilding /> },
  { name: 'Cabin', icon: <FaTree /> },
  { name: 'Villa', icon: <FaGem /> },
  { name: 'Cottage', icon: <FaTractor /> },
  { name: 'Chalet', icon: <FaCampground /> },
  { name: 'Penthouse', icon: <FaBuilding /> },
  { name: 'Mansion', icon: <FaLandmark /> },
  { name: 'Jhonpri', icon: <FaHome /> },
  { name: 'Kotha', icon: <FaWarehouse /> },
];


interface CategoriesProps {
  onCategorySearch: (CategoryParams: {type: string}) => void;
} 
const Categories = ({onCategorySearch}: CategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
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

  const handleCategory = (category: string) => {
    setActiveCategory(category);

    // Call the handleCategory function from the parent component
    if(category === "All"){
      onCategorySearch({type: ""});
    }else{
    onCategorySearch({type: category});
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
            onClick={() => handleCategory(category.name)}>
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
