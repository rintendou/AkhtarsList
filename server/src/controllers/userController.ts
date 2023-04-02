import { Request, Response } from "express"
import UserModel from "../models/User"
import mongoose from "mongoose"

export const getUser = async (req: Request, res: Response) => {
  // Extract username from params
  const { userId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId params is required!", data: null, ok: false })
  }

  // Check if userId is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId)
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
