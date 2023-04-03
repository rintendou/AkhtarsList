import express from 'express'

// auth controller
import { createListing, deleteListing, updateListing, fetchListings } from '../controllers/listingController'

const ListingRoute = express.Router()

// Create listing
ListingRoute.post('/post', createListing)

// Delete listing
ListingRoute.delete('/delete/:listingId', deleteListing)

// Update listing
ListingRoute.put('/edit/:listingId', updateListing)

// Fetch all listings
ListingRoute.get('/fetch', fetchListings)

export default ListingRoute
