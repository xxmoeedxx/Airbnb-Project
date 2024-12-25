import React from 'react';
import {Link} from 'react-router-dom'
import useAuth from './useAuth';
interface Listing {
  _id: string;
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
  const { user } = useAuth();
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/listings/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Listing deleted successfully");
          window.location.reload();
          
        } else {
          alert("Failed to delete the listing");
        }
      } catch (error) {
        console.error("Error deleting the listing:", error);
        alert("An error occurred while deleting the listing");
      }
    }
  };

  return (
    <>
      <div
      className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out cursor-pointer"
    >
    <Link to={`/listings/${listing._id}`}>
      {/* Property Image */}
      <div className="overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover transition-transform transform hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      </Link>
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
        {user?.role === 'admin' && (
        <button
          onClick={() => handleDelete(listing._id)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 4a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1zm4 0a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      </div>
    </div>
    
    </>
  );
};

export default ListingCard;
