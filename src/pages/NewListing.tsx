import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const NewListing = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newListing = {
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      images,
      amenities,
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
        <BackButton className="mb-4" />
      <h1 className="text-4xl font-bold text-center mb-6 text-red-500">Create a New Listing</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex items-center">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Type */}
        <div className="flex items-center">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g., Apartment, Villa, Cabin"
            required
          />
        </div>

        {/* Guests */}
        <div className="flex items-center">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Maximum Guests
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Bedrooms */}
        <div className="flex items-center">
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Bathrooms */}
        <div className="flex items-center">
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Price */}
        <div className="flex items-center">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price per Night
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Images */}
        <div className="flex items-center">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Image URLs (comma-separated)
          </label>
          <input
            type="text"
            id="images"
            value={images.join(', ')}
            onChange={(e) => setImages(e.target.value.split(',').map((url) => url.trim()))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Amenities */}
        <div className="flex items-center">
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">
            Amenities (comma-separated)
          </label>
          <input
            type="text"
            id="amenities"
            value={amenities.join(', ')}
            onChange={(e) => setAmenities(e.target.value.split(',').map((item) => item.trim()))}
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold"
        >
          Create Listing
        </button>

        {/* Success/Error Messages */}
        {success && <p className="text-green-500 mt-4">Listing created successfully! Redirecting...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default NewListing;
