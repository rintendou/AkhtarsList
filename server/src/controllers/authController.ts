import { Request, Response } from "express"
import UserModel from "../models/User"
import bcrypt from "bcrypt"

export const registerUser = async (req: Request, res: Response) => {
  // destructure the payload attached to the body
  const { username, password, address } = req.body

  // Check if appropriate payload is attached to the body
  if (!username || !password || !address) {
    return res.status(400).json({
      message: "username, password, and address properties are required!",
      data: null,
      ok: false,
    })
  }

  try {
    // Hashing password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    // Clean the username by removing whitespaces
    const cleanedUsername = username.replace(/\s+/g, "") // '  hello world ' -> 'helloworld'

    // Check if the username already exists in the db
    const existingUser = await UserModel.findOne({
      username: cleanedUsername,
    })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists!", data: null, ok: false })
    }

    // Creating new User
    const user = new UserModel({
      username: cleanedUsername,
      password: hashedPassword,
      address: address,
      balance: 0,
    })

    // Saving new User
    const registeredUser = await user.save()
    res.status(200).json({
      message: "User successfully registered!",
      data: registeredUser,
      ok: true,
    })
  } catch (error) {
    res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  /* 
	Search DB via the User Schema w/ unique username. 
	Compare the password in the req to encrypted password in the DB.
	*/

  // destructure the payload attached to the body
  const { username, password } = req.body

  // Check if appropriate payload is attached to the body
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password properties are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    })

    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", data: null, ok: false })

    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password
    )

    if (!validPassword)
      return res
        .status(400)
        .json({ message: "User not found", data: null, ok: false })

    return res
      .status(200)
      .json({ message: "Login Success!", data: user, ok: true })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
