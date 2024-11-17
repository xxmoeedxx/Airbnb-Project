const express = require('express');
const cors = require('cors');
const listings = require('./data/mockListings');
const bookings = require('./data/bookings.json'); // Import your mock bookings data
const listingsRouter = require('./routes/listings');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// Routes
app.use('/api/listings', listingsRouter);

app.get('/api/bookings', (req, res) => {
  res.json(bookings); // Send the bookings data as a response
});


app.get('/api/listings', (req, res) => {
  res.json(listings);
  // console.log("Listings: ",listings);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find(l => l.id === parseInt(req.params.id));
  listing ? res.json(listing) : res.status(404).json({ error: 'Listing not found' });
});



app.post('/api/bookings', (req, res) => {
  res.json({ message: 'Booking successful', bookingData: req.body });

  // Add the new booking to the bookings data
  bookings.push(req.body);
  // Save the updated bookings data to the file
  const fs = require('fs');
  fs.writeFileSync('./data/bookings.json', JSON.stringify(bookings, null, 2));

});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
