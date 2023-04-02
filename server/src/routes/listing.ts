import express from 'express'

// auth controller
import { createListing, deleteListing, updateListing, fetchListing } from '../controllers/listingController'

const ListingRoute = express.Router()

// Create listing
ListingRoute.post('/post', createListing)

// Delete listing
ListingRoute.delete('/delete', deleteListing)

// Update listing
ListingRoute.put('/edit', updateListing)

// Fetch all listings
ListingRoute.get('/fetch', fetchListing)

export default ListingRoute
