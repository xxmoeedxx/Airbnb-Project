// src/pages/Homepage.js
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const mockListings = [
  {
    id: 1,
    image: '/images/home1.jpg',
    title: 'Cozy Beachfront House',
    type: 'Entire home',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 120,
    rating: 4.8,
  },
    {
        id: 2,
        image: '/images/home2.jpg',
        title: 'Modern Apartment in City Center',
        type: 'Apartment',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        price: 90,
        rating: 4.5,
      },
      {
        id: 3,
        image: '/images/home3.jpg',
        title: 'Rustic Cabin in the Woods',
        type: 'Cabin',
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        price: 150,
        rating: 4.9,
      },
    {
        id: 4,
        image: '/images/home4.jpg',
        title: 'Spacious Countryside Villa',
        type: 'Entire home',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        price: 200,
        rating: 5.0,
    },
    {
        id: 5,
        image: '/images/home5.jpg',
        title: 'Luxury Penthouse with City View',
        type: 'Penthouse',
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        price: 300,
        rating: 4.7,
    },
    {
        id: 6,
        image: '/images/home6.jpg',
        title: 'Charming Cottage by the Lake',
        type: 'Cottage',
        guests: 5,
        bedrooms: 3,
        bathrooms: 2,
        price: 130,
        rating: 4.6,
    },
    {
        id: 7,
        image: '/images/home7.jpg',
        title: 'Modern Loft in Downtown',
        type: 'Loft',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        price: 110,
        rating: 4.4,
    },
    {
        id: 8,
        image: '/images/home8.jpg',
        title: 'Secluded Mountain Retreat',
        type: 'Cabin',
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        price: 180,
        rating: 4.9,
    },
    {
        id: 9,
        image: '/images/home9.jpg',
        title: 'Historic Home with Garden',
        type: 'Entire home',
        guests: 7,
        bedrooms: 4,
        bathrooms: 3,
        price: 160,
        rating: 4.8,
    },
    {
        id: 10,
        image: '/images/home10.jpg',
        title: 'Beach House with Ocean View',
        type: 'Entire home',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        price: 250,
        rating: 4.9,
    },
];

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
