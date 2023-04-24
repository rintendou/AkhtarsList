import { Request, Response } from 'express'
import ListingModel from '../models/Listing'
import UserModel from '../models/User'
import mongoose from 'mongoose'

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

    // Create listing object
    const listing = new ListingModel({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        lister: listerId,
        listerUsername: listerId.username,
        desc: desc,
        image: image,
        bidders: [],
        startPrice: startPrice,
        finalPrice: startPrice,
        expireAt: expireAt,
        category: category,
        weight: weight,
        dimensions: dimensions,
        status: 'active',
        views: 0,
    })

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

        await ListingModel.updateMany(
            { expireAt: { $lt: new Date() }, status: { $nin: ['sold', 'disputed'] } },
            { $set: { status: 'expired' } }
        )

        const expiredListings = listings.filter((listing) => new Date(listing.expireAt) < new Date())

        for (const expiredListing of expiredListings) {
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
            message: 'Listing successfully fetched!',
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
        const existingListing = await ListingModel.findOne({
            _id: listingId,
        })
        if (!existingListing) {
            return res.status(400).json({ message: 'Listing does not exist!', data: null, ok: false })
        }

        res.status(200).json({
            message: 'Listing successfully fetched!',
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
    if (listing.finalPrice === req.body.finalPrice) {
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

    // Edge Case: The lister tries to bid on their own listing
    if (listing.bestBidder == listing.lister) {
        return res.status(400).json({
            message: 'You cannot bid on your own listing.',
            data: null,
            ok: false,
        })
    }

    // Main Logic
    try {
        // Update the best bidder + price of the listing, then refund the balance to the previous best bidder

        try {
            // Update the balance of the previous bidder

            const prevBestBidder = await UserModel.findById(listing.bestBidder)

            if (prevBestBidder) {
                prevBestBidder.balance += listing.finalPrice
                await prevBestBidder.save()
            }
        } catch (error) {
            return res.status(400).json({
                message: 'ERROR: Failed to refund previous bidder',
                data: error,
                ok: false,
            })
        }

        try {
            // Updating the balance and the biddings of the new best bidder
            bidder.balance -= req.body.finalPrice
            if (listing.bestBidder && bidder._id.equals(listing.bestBidder!._id)) {
                bidder.balance += +listing.finalPrice
            }

            // Check if listing already exists on the biddings list of the bidder
            const updatedUserBiddings = bidder.biddedListings.filter(
                (biddedListingId) => !biddedListingId.equals(listing._id)
            )
            updatedUserBiddings.push(listing._id)

            bidder.biddedListings = updatedUserBiddings.reverse()

            await bidder.save()
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                message: 'ERROR: Failed to update balance of current bidder',
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
            // Updating the listing's list of bidders but also updating if a bidder has already bid on this listing before
            let updatedListingBidders = listing.bidders

            updatedListingBidders = updatedListingBidders.filter((listingBiddersId) => {
                return listingBiddersId !== bidder.username
            })

            listing.bidders = [bidder.username, ...updatedListingBidders]

            listing.transactions = [`${bidder.username} $${req.body.finalPrice}`, ...listing.transactions]

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

export const modifyListingStatus = async (req: Request, res: Response) => {
    // Destructure payload from body
    const { status } = req.body
    const { listingId } = req.params

    // Check if appropriate payload is passed
    if (!status) {
        return res.status(400).json({
            message: 'status is a required property!',
            data: null,
            ok: false,
        })
    }

    // Check if status has a valid value
    if (status !== 'active' && status !== 'expired' && status !== 'disputed' && status !== 'sold') {
        return res.status(400).json({
            message: 'Invalid status property!',
            data: null,
            ok: false,
        })
    }

    try {
        // Check if listing exists
        const existingListing = await ListingModel.findById(listingId)
        if (!existingListing) {
            return res.status(404).json({
                message: 'Listing does not exist!',
                data: null,
                ok: false,
            })
        }

        // Check if listing is not expired
        const isExpired = new Date(existingListing.expireAt) < new Date()
        if (!isExpired) {
            return res.status(400).json({
                message: 'Cannot modify the status of active listing!',
                data: null,
                ok: false,
            })
        }

        // Check if currStatus = sold
        const isAlreadySold = existingListing.status === 'sold'
        if (isAlreadySold) {
            return res.status(400).json({
                message: `You cannot modify the status of a sold item!`,
                data: null,
                ok: false,
            })
        }

        // Check if currStatus = newStatus
        const isSameStatus = status === existingListing.status
        if (isSameStatus) {
            return res.status(400).json({
                message: `Status of this listing is already ${status}!`,
                data: null,
                ok: false,
            })
        }

        existingListing.status = status
        await existingListing.save()

        res.status(200).json({
            message: `Listing status has been successfully set to ${status}!`,
            data: status,
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

export const reportListing = async (req: Request, res: Response) => {
    // Extract payload from params and body
    const { listingId } = req.params
    const { userId } = req.body

    // Check if appropriate payload is attached
    if (!listingId || !userId) {
        return res.status(400).json({
            message: 'listingId params and userId property are required!',
            data: null,
            ok: false,
        })
    }

    try {
        // Check if listing to be reported exists
        const existingReportedListing = await ListingModel.findOne({
            _id: listingId,
        })
        if (!existingReportedListing) {
            return res.status(404).json({
                message: 'Listing does not exist!',
                data: null,
                ok: false,
            })
        }

        // Check if user exists
        const existingUser = await UserModel.findById(userId)
        if (!existingUser) {
            return res.status(404).json({
                message: 'Invalid credentials!',
                data: null,
                ok: false,
            })
        }

        // Update all admin's reportedListings
        const admins = await UserModel.find({ isAdmin: true })
        const updatedReportedListings = [
            existingReportedListing._id,
            ...existingUser.reportedListings
                .filter((listing) => !listing._id.equals(existingReportedListing._id))
                .map((listing) => listing._id),
        ]
        for (const admin of admins) {
            admin.reportedListings = updatedReportedListings
            await admin.save()
        }

        res.status(400).json({
            message: 'Listing successfully reported!',
            data: null,
            ok: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error,
            data: error,
            ok: false,
        })
    }
}
