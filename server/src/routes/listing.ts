import express from "express"

// auth controller
import {
  createListing,
  deleteListing,
  updateListing,
  fetchListings,
  fetchListingsByCategory,
} from "../controllers/listingController"

const ListingRoute = express.Router()

// Create listing
ListingRoute.post("/post", createListing)

// Delete listing
ListingRoute.delete("/delete/:listingId", deleteListing)

// Update listing
ListingRoute.put("/edit/:listingId", updateListing)

// Fetch all listings
ListingRoute.get("/fetch", fetchListings)

// Fetch listings by category
ListingRoute.get("/fetch-by-category", fetchListingsByCategory)

export default ListingRoute
