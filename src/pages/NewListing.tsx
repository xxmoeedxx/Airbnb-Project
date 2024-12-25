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
    // const [images, setImages] = useState<string[]>([]);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [rating] = useState(4.5);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const navigate = useNavigate();
    let images: string[] = [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (!files) {
            alert('Please select files first.');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('images', file); // 'images' is the field name expected by the backend
        });

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                images = data.filePaths;
            } else {
                throw new Error('Failed to upload files');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while uploading the files.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleUpload();
        const newListing = {
            title,
            type,
            guests,
            bedrooms,
            bathrooms,
            price,
            images,
            amenities,
            rating,
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
            <form onSubmit={handleSubmit} className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Title */}
                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
                <div className="flex flex-col">
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
                    Upload Images:
                </label>
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
                </div>
                {/* Amenities */}
                <div className="flex flex-col">
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
            </div>
            {/* Submit Button */}
            <div className="py-6">
                <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-bold"
                >
                Create Listing
                </button>
            </div>
            {/* Success/Error Messages */}
            {success && <p className="text-green-500 mt-4">Listing created successfully! Redirecting...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default NewListing;
