import express from 'express'

// auth controller
import {
    createListing,
    deleteListing,
    updateListing,
    fetchListings,
    fetchListingsByCategory,
    fetchTrendingListings,
    bidOnListing,
} from '../controllers/listingController'

const ListingRoute = express.Router()

// Create listing
ListingRoute.post('/post', createListing)

// Delete listing
ListingRoute.delete('/delete/:listingId', deleteListing)

// Update listing
ListingRoute.put('/update/:listingId', updateListing)

// Fetch all listings
ListingRoute.get('/fetch', fetchListings)

// Fetch listings by category
ListingRoute.get('/fetch-by-category', fetchListingsByCategory)

// Fetch trending listings
ListingRoute.get('/fetch-by-trending', fetchTrendingListings)

// Fetch specific listing
ListingRoute.get('/fetch/:listingId', fetchListings)

// Bid on Listing
ListingRoute.put('/bid/:listingId', bidOnListing)

export default ListingRoute
