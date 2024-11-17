import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState({ id: 0, title: '', type: '', guests: 0, bedrooms: 0, bathrooms: 0, price: 0, image: '', amenities: [] });

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then(response => response.json())
      .then(data => setListing(data))
      .catch(error => console.error('Error fetching listing:', error));
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Listing Title */}
      <BackButton className="mb-4" />
      <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>

      {/* Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {listing.images.map((image, index) => (
          <img 
            key={index} 
            className="w-full h-60 object-cover rounded-lg" 
            src={image} 
            alt={`${listing.title} image ${index + 1}`} 
          />
        ))} */}
              <img className="w-full h-64 object-cover rounded-lg" src={listing.image}
               alt={listing.title} />

      </div>

      {/* Listing Details and Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Property Info */}
        <div className="col-span-2">
          <div className="mb-4">
            <p className="text-lg">{listing.type} hosted by Superhost</p>
            <p className="text-gray-600">
              {listing.guests} Guests · {listing.bedrooms} Bedrooms · {listing.bathrooms} Bathrooms
            </p>
          </div>

          {/* Description Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Property Description</h2>
        <p className="text-gray-800 mt-2">
          This beautiful {listing.type} is located in a prime location with access to the best amenities.
          Perfect for your vacation getaway with all the comforts you need for a relaxing stay.
        </p>
      </div>
          {/* Amenities */}
          {/* <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
          <ul className="list-disc list-inside text-gray-800">
            {listing.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul> */}
        </div>

            
        {/* Pricing and Book Now Button */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="border-b pb-4 mb-4">
            <p className="text-2xl font-bold">${listing.price}</p>
            <p className="text-gray-600">per night</p>
          </div>
          
          
            <Link to={`/book/${listing.id}?title=${encodeURIComponent(listing.title)}&price=${listing.price}`}>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-bold">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default ListingDetails;
