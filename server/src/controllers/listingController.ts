import { Request, Response } from "express"
import ListingModel from "../models/Listing"
import UserModel from "../models/User"
import mongoose from "mongoose"

export const createListing = async (req: Request, res: Response) => {
  const {
    title,
    lister,
    desc,
    image,
    startPrice,
    expireAt,
    category,
    weight,
    dimensions,
  } = req.body

  // Check if the required fields are filled in
  if (
    !title ||
    !lister ||
    !desc ||
    !startPrice ||
    !expireAt ||
    !weight ||
    !dimensions
  ) {
    return res.status(400).json({
      message: "Insufficent details.",
      data: null,
      ok: false,
    })
  }

  try {
    /* 
        WIP: Duplication Detection System, suggestions:
        - string-similarity: This package provides various algorithms for comparing the similarity of two strings, such as the Jaro-Winkler distance or the Levenshtein distance. These algorithms can be useful for detecting duplicate listings based on their name, description, or other attributes.
        - fuzzyset.js: This package provides a fuzzy string matching algorithm that can match similar strings even if they are not an exact match. It uses a technique called trigram matching, which compares substrings of three characters from the target string with those of the input string.
        - node-cache: This package provides an in-memory cache for storing the results of previous duplicate detection checks. By caching the results, you can avoid performing the same check multiple times and improve the performance of your system.
        - lodash: This package provides various utility functions for working with arrays, objects, and strings, which can be useful for implementing duplicate detection algorithms.
        */

    // Check if user exists
    const existingUser = await UserModel.findOne({ username: lister })
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    // Create listing object
    const listing = new ListingModel({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      lister: existingUser._id,
      desc: desc,
      image: image,
      bidders: [],
      startPrice: startPrice,
      finalPrice: startPrice,
      expireAt: expireAt,
      category: category,
      weight: weight,
      dimensions: dimensions,
      views: 0,
    })

    // Saving to DB
    await listing.save()

    // Saving Listing to User
    existingUser.listedListings.push(listing._id)
    await existingUser.save()

    // Return res
    return res.status(200).json({
      message: "Listing successfully created!",
      data: listing,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}

export const deleteListing = async (req: Request, res: Response) => {
  // param == _id of listing
  // Check if User is the owner of the listing || admin
  // TRUE -> Delete
  // FALSE -> Throw error

  const listingId = req.params.listingId
  const listing = await ListingModel.findById(listingId)

  const username = req.body.username
  const user = await UserModel.findOne({
    username: username
  })


  // If the listing's lister does not match with the userId, then user is trying to manipulate a listing that is not theirs
  if (!listing?.lister == username || user?.isAdmin == true) {
    return res.status(400).json({
      message: "You can't delete a listing that is not yours!",
      data: null,
      ok: false,
    })
  }

  try {
    await ListingModel.findByIdAndDelete(listingId)
    return res.status(200).json({
      message: `Sucessfully deleted listing ${listingId}`,
      data: listing,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}

export const fetchListings = async (req: Request, res: Response) => {
  try {
    const listings = await ListingModel.find()

    if (listings.length === 0) {
      return res.status(404).json({
        message: "No listings found!",
        data: listings,
        ok: true,
      })
    }

    res.status(200).json({
      message: "Listings successfully fetched!",
      data: listings.reverse(),
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}

export const fetchListingsByCategory = async (req: Request, res: Response) => {
  const { category } = req.body

  if (!category) {
    return res.status(400).json({
      message: "category property is required!",
      data: null,
      ok: false,
    })
  }

  try {
    const listings = await ListingModel.find({ category })

    if (listings.length === 0) {
      return res.status(404).json({
        message: "No listings found!",
        data: listings,
        ok: true,
      })
    }

    res.status(200).json({
      message: "Listings successfully fetched!",
      data: listings,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}

export const fetchTrendingListings = async (req: Request, res: Response) => {
  try {
    // Get listings that have views greater than 1 and sort in descending order
    const listings = await ListingModel.find({ views: { $gt: 0 } }).sort({
      views: -1,
    })

    console.log(listings)

    if (listings.length === 0) {
      return res.status(404).json({
        message: "No listings found!",
        data: listings,
        ok: true,
      })
    }

    res.status(200).json({
      message: "Listings successfully fetched!",
      data: listings,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}

export const updateListing = async (req: Request, res: Response) => {
  // Req body contains all the changes we want
  // req params will be the id

    const listingId = req.params.listingId
    const listing = await ListingModel.findById(listingId)

    const username = req.body.username
    const user = await UserModel.findOne({
        username: username
    })

    try {
        if (!listing?.lister == username || user?.isAdmin == true) {
            

        }
    } catch (error) {}
}

export const fetchListing = async (req: Request, res: Response) => {
  // Fetch listing and increment its views field

  const { listingId } = req.params

  // Check if the required fields are filled in
  if (!listingId) {
    return res.status(400).json({
      message: "listingId params is required!",
      data: null,
      ok: false,
    })
  }

  // Check if the listingId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    return res.status(400).json({
      message: "Invalid listingId!",
      data: null,
      ok: false,
    })
  }

  try {
    // Check if listing exists
    const existingListing = await ListingModel.findOneAndUpdate(
      { _id: listingId },
      { $inc: { views: 1 } },
      { new: true }
    )
    if (!existingListing) {
      return res
        .status(400)
        .json({ message: "Listing does not exist!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Listing successfully fetched!",
      data: existingListing,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      ok: false,
    })
  }
}
