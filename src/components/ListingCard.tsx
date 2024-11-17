import React from 'react';
import {Link} from 'react-router-dom'
interface Listing {
  id: number;
  images: string[];
  title: string;
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
}

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  console.log(listing);
  return (
    <Link to={`/listings/${listing.id}`}>
    <div
      className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out cursor-pointer"
    >
      {/* Property Image */}
      <div className="overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover transition-transform transform hover:scale-110 duration-300 ease-in-out"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{listing.title}</h3>
        <p className="text-sm text-gray-600">
          {listing.type} - {listing.guests} guests, {listing.bedrooms} bedrooms, {listing.bathrooms} bathrooms
        </p>
        <p className="font-semibold text-gray-800 mt-2">${listing.price} / night</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★ {listing.rating}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ListingCard;
