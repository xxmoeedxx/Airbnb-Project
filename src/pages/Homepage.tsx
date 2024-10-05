// src/pages/Homepage.js
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import  mockListings from '../data/mockListings';

const Homepage = () => {
  const [listings, setListings] = useState([{ id: 0, image: '', title: '', type: '', guests: 0, bedrooms: 0, bathrooms: 0, price: 0, rating: 0 }]);

  useEffect(() => {
    // Simulate fetching data
    setListings(mockListings);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <SearchBar />
        <Categories />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
