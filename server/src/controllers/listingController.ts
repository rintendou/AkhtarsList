import { Request, Response } from 'express'
import ListingModel from '../models/Listing'
import UserModel from '../models/User'
import mongoose from 'mongoose'
import multer from 'multer'
import { storage, upload, bucket } from '../server'
import { Readable, Writable } from 'stream'

export const createListing = async (req: Request, res: Response) => {
    const { title, listerId, desc, image, startPrice, expireAt, category, weight, dimensions } = req.body

    // Check if the required fields are filled in
    if (!title || !listerId || !desc || !startPrice || !expireAt || !weight || !dimensions) {
        return res.status(400).json({
            message: 'Insufficent details.',
            data: null,
            ok: false,
        })
    }

    /* 
    WIP: Duplication Detection System, suggestions:
    - string-similarity: This package provides various algorithms for comparing the similarity of two strings, such as the Jaro-Winkler distance or the Levenshtein distance. These algorithms can be useful for detecting duplicate listings based on their name, description, or other attributes.
    - fuzzyset.js: This package provides a fuzzy string matching algorithm that can match similar strings even if they are not an exact match. It uses a technique called trigram matching, which compares substrings of three characters from the target string with those of the input string.
    - node-cache: This package provides an in-memory cache for storing the results of previous duplicate detection checks. By caching the results, you can avoid performing the same check multiple times and improve the performance of your system.
    - lodash: This package provides various utility functions for working with arrays, objects, and strings, which can be useful for implementing duplicate detection algorithms.
    */

    try {
        // Create listing object
        const listing = new ListingModel({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            lister: listerId,
            desc: desc,
            image: image,
            bidders: [],
            bestBidder: listerId, // Best bidder will be yourself at first.
            startPrice: startPrice,
            finalPrice: startPrice,
            expireAt: expireAt,
            category: category,
            weight: weight,
            dimensions: dimensions,
            views: 0,
        })

        try {
            upload.array('listing-image-upload', 12) // First parameter == name of the file upload input in the HTML/React component, second parameter == max # of files permitted

            const readablePhotoStream = new Readable()
            readablePhotoStream.push(req.files)
            readablePhotoStream.push(null)

            const uploadStream = bucket.openUploadStream(image)
            const id = uploadStream.id
            readablePhotoStream.pipe(uploadStream)

            uploadStream.on('error', () => {
                return res.status(400).json({
                    message: 'Error uploading file.',
                    data: image,
                    ok: false,
                })
            })

            uploadStream.on('finish', () => {
                return res.status(200).json({
                    message: 'File uploaded, stored w/ the ObjectId:' + id,
                    data: image,
                    ok: true,
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: 'ERROR: IDK WHAT IS GOING ON',
                data: error,
                ok: false,
            })
        }

        // Saving to DB
        await listing.save()

        // Saving Listing to User
        const lister = await UserModel.findById(listerId)
        lister!.listedListings.push(listing._id)
        await lister!.save()

        // Return res
        return res.status(200).json({
            message: 'Listing successfully created!',
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

    const userId = req.body.userId
    const user = await UserModel.findById(userId)

    // If the listing's lister does not match with the userId, then user is trying to manipulate a listing that is not theirs
    if (!listing?.lister == userId || user?.isAdmin == true) {
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
                message: 'No listings found!',
                data: listings,
                ok: true,
            })
        }

        const expiredListings = listings.filter((listing) => new Date(listing.expireAt) < new Date())

        for (const expiredListing of expiredListings) {
            if (expiredListing.bestBidder!.equals(expiredListing.lister)) {
                continue
            }
            await UserModel.findByIdAndUpdate(
                expiredListing.bestBidder,
                {
                    $addToSet: { wonListings: expiredListing._id },
                },
                { new: true }
            )
        }

        res.status(200).json({
            message: 'Listings successfully fetched!',
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
    const { category } = req.params

    if (!category) {
        return res.status(400).json({
            message: 'category property is required!',
            data: null,
            ok: false,
        })
    }

    try {
        const listings = await ListingModel.find({ category })

        if (listings.length === 0) {
            return res.status(404).json({
                message: 'No listings found!',
                data: listings,
                ok: true,
            })
        }

        res.status(200).json({
            message: 'Listings successfully fetched!',
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
                message: 'No listings found!',
                data: listings,
                ok: true,
            })
        }

        res.status(200).json({
            message: 'Listings successfully fetched!',
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

export const viewListing = async (req: Request, res: Response) => {
    // Fetch listing and increment its views field

    const { listingId } = req.params

    // Check if the required fields are filled in
    if (!listingId) {
        return res.status(400).json({
            message: 'listingId params is required!',
            data: null,
            ok: false,
        })
    }

    // Check if the listingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return res.status(400).json({
            message: 'Invalid listingId!',
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
            return res.status(400).json({ message: 'Listing does not exist!', data: null, ok: false })
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
    const existingListing = await ListingModel.findOne({
      _id: listingId,
    })
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

export const updateListing = async (req: Request, res: Response) => {
    // Req body contains all the changes we want
    // req params will be the id

    const listingId = req.params.listingId
    const listing = await ListingModel.findById(listingId)

    const userId = req.body.userId

    if (!listingId || !userId) {
        return res.status(400).json({
            message: 'listingId params and userId property is required!',
            data: null,
            ok: false,
        })
    }

    if (!mongoose.Types.ObjectId.isValid(listingId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: 'invalid listingId or userId!',
            data: null,
            ok: false,
        })
    }

    const user = await UserModel.findById(userId)

    try {
        if (listing?.lister == userId || user?.isAdmin == true) {
            await listing?.updateOne(req.body)

            return res.status(200).json({
                message: 'Successfully updated listing',
                data: listing,
                ok: true,
            })
        }

        return res.status(400).json({
            message: 'You cannot update a listing that is not yours',
            data: null,
            ok: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'ERROR',
            data: error,
            ok: false,
        })
    }
}

export const bidOnListing = async (req: Request, res: Response) => {
    // Check if user has enough funds.
    // Check if the listing price < user price
    // Update finalPrice and the highestBidder and refund the prev bidder
    const listingId = req.params.listingId
    const listing = await ListingModel.findById(listingId)

    const userId = req.body.userId
    const bidder = await UserModel.findById(userId)

    // Edge Case: Listing does not exist
    if (!listing) {
        return res.status(400).json({
            message: 'Listing does not exist',
            data: null,
            ok: false,
        })
    }

    // Edge Case: Bidder does not exist
    if (!bidder) {
        return res.status(400).json({
            message: 'Bidder does not exist',
            data: null,
            ok: false,
        })
    }

    // Edge Case: Listing has expired
    if (new Date() > new Date(listing.expireAt)) {
        return res.status(400).json({
            message: 'Listing has expired',
            data: null,
            ok: false,
        })
    }

    // Edge Case: Bid less than the current highest bid
    if (listing.finalPrice > req.body.finalPrice) {
        return res.status(400).json({
            message: 'You cannot bid less than the current bid.',
            data: null,
            ok: false,
        })
    }

    // Edge Case: Bidder bids the same amount
    if (listing.finalPrice == req.body.finalPrice) {
        return res.status(400).json({
            message: 'You can not bid an equal amount.',
            data: null,
            ok: false,
        })
    }

    // Edge Case: Bidder has insufficient funds
    if (bidder.balance < req.body.finalPrice) {
        return res.status(400).json({
            message: 'ERROR: Insufficient funds.',
            data: null,
            ok: false,
        })
    }

    // Main Logic
    try {
        // This will cover the case where there are no bid to begin with.
        if (listing.bestBidder === undefined) {
            const prevBalance = bidder.balance // In case balance needs to be refunded.
            bidder.balance -= req.body.finalPrice // Deduct balance
            await bidder.save()

            try {
                listing.finalPrice = req.body.finalPrice
                listing.bestBidder = req.body.bestBidder
                await listing.save()

                return res.status(200).json({
                    message: `${userId} has placed the first bid of ${req.body.finalPrice}`,
                    data: listing,
                    ok: true,
                })
            } catch (error) {
                bidder.balance = prevBalance // In case of failure, return the balance taken away from the bidder's account
                await bidder.save()

                return res.status(400).json({
                    message: 'ERROR: Refunded balance.',
                    data: error,
                    ok: false,
                })
            }
        }

        // This will cover the case where the lister tries to bid on their own listing
        if (listing.bestBidder == listing.lister) {
            return res.status(400).json({
                message: 'You cannot bid on your own listing.',
                data: null,
                ok: false,
            })
        }

        // Update the best bidder + price of the listing, then refund the balance to the previous best bidder
        try {
            try {
                // Update the balance of the previous bidder
                const prevBestBidder = await UserModel.findById(listing.bestBidder)
                prevBestBidder!.balance += listing.finalPrice
                await prevBestBidder!.save()

                // the three lines above was not able to handle
                // when the previous best bidder is the current bidder
                if (prevBestBidder!._id.equals(bidder._id)) {
                    bidder.balance += listing.finalPrice
                    await bidder.save()
                }
            } catch (error) {
                return res.status(400).json({
                    message: 'ERROR: Failed to refund previous bidder',
                    data: error,
                    ok: false,
                })
            }

            try {
                // Update the listing
                listing.finalPrice = req.body.finalPrice
                listing.bestBidder = userId
                await listing.save()
            } catch (error) {
                return res.status(400).json({
                    message: 'ERROR: Failed to update listing',
                    data: error,
                    ok: false,
                })
            }

            try {
                // Updating the balance and the biddings of the new best bidder
                bidder.balance -= req.body.finalPrice

                // Check if listing already exists on the biddings list of the bidder
                const updatedUserBiddings = bidder.biddedListings.filter(
                    (biddedListingId) => !biddedListingId.equals(listing._id)
                )
                updatedUserBiddings.push(listing._id)

                bidder.biddedListings = updatedUserBiddings.reverse()

                await bidder.save()
            } catch (error) {
                return res.status(400).json({
                    message: 'ERROR: Failed to update balance of current bidder',
                    data: error,
                    ok: false,
                })
            }

      try {
        // Updating the listing's list of bidders but also updating if a bidder has already bid on this listing before
        let updatedListingBidders = listing.bidders

        updatedListingBidders = updatedListingBidders.filter(
          (listingBiddersId) => {
            return listingBiddersId !== bidder.username
          }
        )

        updatedListingBidders.push(bidder._id)
        listing.bidders = updatedListingBidders

                await listing.save()
            } catch (error) {
                return res.status(400).json({
                    message: 'ERROR: Failed to update the bidders of this listing',
                    data: error,
                    ok: false,
                })
            }

            return res.status(200).json({
                message: `${bidder.username} has placed a better bid of $${req.body.finalPrice}`,
                data: listing,
                ok: true,
            })
        } catch (error) {
            return res.status(500).json({
                message: 'ERROR: EVERYTHING IS WRONG',
                data: error,
                ok: false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'ERROR: God save the queen...',
            data: null,
            ok: false,
        })
    }
}

export const fetchListingsBidders = async (req: Request, res: Response) => {
    // Destructure payload
    const { listingId } = req.params
    const listing = await ListingModel.findOne({ _id: listingId })

    // Edge Case: Check if listing exists
    if (!listing) {
        return res.status(404).json({ message: 'Listing does not exist', data: null, ok: false })
    }

    // Edge Case: Check if listing does not have bidders
    if (listing.bidders.length === 0) {
        return res.status(404).json({
            message: 'Listing does not have any bidders',
            data: null,
            ok: false,
        })
    }

    const listingBidderIds = listing.bidders
    const listings = await ListingModel.find({ title: regex })

    try {
        const users = await UserModel.find({ _id: { $in: listingBidderIds } }, { username: 1 })
        const usernames = users.map((user) => user.username)
        res.status(200).json({
            message: 'Usernames retrieved successfully',
            data: usernames,
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

export const fetchListingsFromSearch = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string

        if (!query) {
            return res.status(400).json({ message: 'query property is required!', data: null, ok: false })
        }

        const regex = new RegExp(query, 'i') // 'i' flag makes the search case-insensitive

        const listings = await ListingModel.find({ title: regex })

        return res.status(200).json({
            message: 'Listings fetched successfully',
            data: listings,
            ok: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching listings',
            data: null,
            ok: false,
        })
    }
}
