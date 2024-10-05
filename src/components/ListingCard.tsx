
interface Listing {
  image: string;
  title: string;
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
}

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md p-4">
      <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-2">{listing.title}</h3>
      <p>{listing.type} - {listing.guests} guests, {listing.bedrooms} bedrooms, {listing.bathrooms} bathrooms</p>
      <p className="font-bold">${listing.price} / night</p>
      <div className="text-yellow-500">★ {listing.rating}</div>
    </div>
  );
};

export default ListingCard;
