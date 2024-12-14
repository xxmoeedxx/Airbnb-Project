const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Could be replaced with a reference to a User schema
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
