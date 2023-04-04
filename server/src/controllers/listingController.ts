import { Request, Response } from 'express'
import ListingModel from '../models/Listing'
import mongoose from 'mongoose'
import UserModel from '../models/User'

export const createListing = async (req: Request, res: Response) => {
    const { title, lister, desc, image, startPrice, expireAt, category, weight, dimensions } = req.body

    // Check if the required fields are filled in
    if (!title || !lister || !desc || !startPrice || !expireAt || !weight || !dimensions) {
        return res.status(400).json({
            message: 'Insufficent details.',
            data: null,
            ok: false,
        })
    }

    try {
        const finalPrice = startPrice // Set final price to start price because that is technically the highest bid

        /* 
        WIP: Duplication Detection System, suggestions:
        - string-similarity: This package provides various algorithms for comparing the similarity of two strings, such as the Jaro-Winkler distance or the Levenshtein distance. These algorithms can be useful for detecting duplicate listings based on their name, description, or other attributes.
        - fuzzyset.js: This package provides a fuzzy string matching algorithm that can match similar strings even if they are not an exact match. It uses a technique called trigram matching, which compares substrings of three characters from the target string with those of the input string.
        - node-cache: This package provides an in-memory cache for storing the results of previous duplicate detection checks. By caching the results, you can avoid performing the same check multiple times and improve the performance of your system.
        - lodash: This package provides various utility functions for working with arrays, objects, and strings, which can be useful for implementing duplicate detection algorithms.
        */

        // Create listing object
        const listing = new ListingModel({
            title: title,
            lister: lister,
            desc: desc,
            image: '',
            bidders: [],
            startPrice: startPrice,
            expireAt: expireAt,
            category: category,
            weight: weight,
            dimensions: dimensions,
        })

        // Saving to DB
        await listing.save()

        // Return res
        return res.status(200).json({
            message: 'Listing successfully created!',
            data: listing,
            ok: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Listing unsucessfully created!',
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
    const lister = req.body.userId

    const listing = await ListingModel.findById(listingId)

    // If the listing's lister does not match with the userId, then user is trying to manipulate a listing that is not theirs
    if (!listing?.lister == lister) {
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

export const updateListing = async (req: Request, res: Response) => {}

export const fetchListings = async (req: Request, res: Response) => {}
