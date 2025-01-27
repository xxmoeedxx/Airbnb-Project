import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const Homepage = () => {
  const [filteredListings, setFilteredListings] = useState([{ _id: "_", images: [], title: '', type: '', guests: 0, bedrooms: 0, bathrooms: 0, price: 0, rating: 0 }]); // Initialize with an empty array

  useEffect(() => {
    fetch('https://airbnb-backend-dz76.onrender.com/api/listings')
      .then(response => response.json())
      .then(data => {
        setFilteredListings(data); // By default, show all listings
      })
      .catch(error => console.error('Error fetching listings:', error));
  }, []);

  // Search handler: filter listings based on the search parameters
  interface SearchParams {
    title: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    guests: number;
  }

  const handleSearch = ({ title, checkInDate, checkOutDate, guests }: SearchParams) => {
    const query = new URLSearchParams({
      title,
      guests: guests.toString(),
      checkInDate: checkInDate ? checkInDate.toISOString() : '',
      checkOutDate: checkOutDate ? checkOutDate.toISOString() : '',
    }).toString();
    
    fetch(`https://airbnb-backend-dz76.onrender.com/api/listings/search?${query}`)
      .then(response => response.json())
      .then(data => setFilteredListings(data))
      .catch(error => console.error('Error fetching filtered listings:', error));
  };

  interface CategoryParams{
    type: string;
  }

  const handleCategory = ({ type }: CategoryParams) => {
    const query = new URLSearchParams({
      type
    }).toString();
    fetch(`https://airbnb-backend-dz76.onrender.com/api/listings/category?${query}`)
      .then(response => response.json())
      .then(data => setFilteredListings(data))
      .catch(error => console.error('Error fetching filtered listings:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
        <Categories onCategorySearch={handleCategory} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
