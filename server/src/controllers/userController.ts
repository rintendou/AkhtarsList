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
  const { _id } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _id) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId).populate(
      "listedListings biddedListings wonListings"
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

export const getListers = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const getBidders = async (req: Request, res: Response) => {
  try {
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
