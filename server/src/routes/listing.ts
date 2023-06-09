import express from "express"

// auth controller
import {
  createListing,
  deleteListing,
  updateListing,
  viewListing,
  fetchListing,
  fetchListings,
  fetchListingsByCategory,
  fetchTrendingListings,
  fetchListingsFromSearch,
  bidOnListing,
  modifyListingStatus,
  reportListing,
} from "../controllers/listingController"

const ListingRoute = express.Router()

// Create listing
ListingRoute.post("/post", createListing)

// Delete listing
ListingRoute.delete("/delete/:listingId", deleteListing)

// Update listing
ListingRoute.put("/update/:listingId", updateListing)

// Fetch specific listing
ListingRoute.get("/fetch/:listingId", fetchListing)

// Fetch all listings
ListingRoute.get("/fetch", fetchListings)

// Fetch listings by category
ListingRoute.get("/fetch-by-category/:category", fetchListingsByCategory)

// Fetch trending listings
ListingRoute.get("/fetch-by-trending", fetchTrendingListings)

// Fetch (view) listing
ListingRoute.get("/fetch-view/:listingId", viewListing)

// Fetch specific listing
ListingRoute.get("/fetch/:listingId", fetchListing)

// Fetch Listing From Search
ListingRoute.get("/search", fetchListingsFromSearch)

// Bid on Listing
ListingRoute.put("/bid/:listingId", bidOnListing)

// Update Listing Status
ListingRoute.put("/status/:listingId", modifyListingStatus)

// Report Listing
ListingRoute.put("/report/:listingId", reportListing)

export default ListingRoute
