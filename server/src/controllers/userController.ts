import { Request, Response } from "express"
import UserModel from "../models/User"
import mongoose from "mongoose"

import JWTRequest from "../lib/types/JWTRequest"

export const getUser = async (req: JWTRequest, res: Response) => {
  // Extract username from params
  const { userId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId params is required!", data: null, ok: false })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId).populate(
      "listedListings biddedListings wonListings reportedListings"
    )
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "User successfully fetched!",
      data: existingUser,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const getUsers = async (req: JWTRequest, res: Response) => {
  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  try {
    // Check if user requesting this data exists
    const existingUser = await UserModel.findOne({ _id: _idFromToken })
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Bad Request!", data: null, ok: false })
    }

    // Check if user is an admin
    const isAdmin = existingUser.isAdmin
    if (!isAdmin) {
      return res
        .status(404)
        .json({ message: "Invalid Credentials!", data: null, ok: false })
    }

    const allUsers = await UserModel.find({})

    res.status(200).json({
      message: "User successfully fetched!",
      data: allUsers,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const withdrawFunds = async (req: Request, res: Response) => {
  // Extract userId and withdrawAmount from body
  const { userId, withdrawAmount } = req.body

  // Check if appropriate payload is attached to the body
  if (!userId || !withdrawAmount) {
    return res.status(400).json({
      message: "userId and withdrawAmount properties are required!",
      data: null,
      ok: false,
    })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const user = await UserModel.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    // Check if balance is sufficient
    if (withdrawAmount > user.balance) {
      return res
        .status(404)
        .json({ message: "Insufficient Funds!", data: null, ok: false })
    }

    // Update user balance
    user.balance = user.balance - withdrawAmount
    await user.save()

    res.status(200).json({
      message: `${withdrawAmount} withdrawn successfully!`,
      data: user.balance,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const depositFunds = async (req: Request, res: Response) => {
  // Extract username and depositAmount from body
  const { userId, depositAmount } = req.body

  // Check if appropriate payload is attached to the body
  if (!userId || !depositAmount) {
    return res.status(400).json({
      message: "userId and depositAmount properties are required!",
      data: null,
      ok: false,
    })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const user = await UserModel.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    // Update user balance
    user.balance = user.balance + depositAmount
    await user.save()

    res.status(200).json({
      message: `${depositAmount} deposited successfully!`,
      data: user.balance,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const applyForAdmin = async (req: Request, res: Response) => {
  // destructure the payload attached to the body
  const { userId, applicationText } = req.body

  // Check if appropriate payload is attached to the body
  if (!userId || !applicationText) {
    return res.status(400).json({
      message: "userId params and applicationText is required!",
      data: null,
      ok: false,
    })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  // Check if user exists
  const existingUser = await UserModel.findOne({ _id: userId })
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Bad Request!", data: null, ok: false })
  }

  // Check if user is already an admin
  const isAlreadyAdmin = existingUser.isAdmin
  if (isAlreadyAdmin) {
    return res
      .status(400)
      .json({ message: "You are already an admin!", data: null, ok: false })
  }

  try {
    // This is a naive application for admin
    // If we have enough time, we will create a collection in our db to store applications then verify them manually
    // This controller fn will naively set the applicant to be an admin when they apply
    existingUser.isAdmin = true
    await existingUser.save()

    res.status(200).json({
      message: "Application sent!",
      data: null,
      ok: true,
    })
  } catch (error) {
    res.status(500).json({ message: error, data: null, ok: false })
  }
}
