import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User'

export const registerUser = async (req: Request, res: Response) => {
    // destructure the payload attached to the body
    const { username, password, confirmPassword, address, securityQuestion, securityQuestionAnswer } = req.body

    // Check if appropriate payload is attached to the body
    if (!username || !password || !confirmPassword || !address || !securityQuestion || !securityQuestionAnswer) {
        return res.status(400).json({
            message:
                'username, password, confirmPassword, address, securityQuestion, and securityQuestionAnswer properties are required!',
            data: null,
            ok: false,
        })
    }

    // Check if password and confirmPassword matches
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Password does not match!',
            data: null,
            ok: false,
        })
    }

    try {
        // Hashing password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        // Hashing securityQuestionAnswer
        const hashedSecurityQuestionAnswer = await bcrypt.hash(securityQuestionAnswer, salt)

        // Clean the username by removing whitespaces
        const cleanedUsername = username.replace(/\s+/g, '') // '  hello world ' -> 'helloworld'

        // Check if the username already exists in the db
        const existingUser = await UserModel.findOne({
            username: cleanedUsername.toLowerCase(),
        })
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists!', data: null, ok: false })
        }

        // Creating new User
        const user = new UserModel({
            username: cleanedUsername.toLowerCase(),
            password: hashedPassword,
            address,
            balance: 0,
            listedListings: [],
            biddedListings: [],
            disputedListings: [],
            wonListings: [],
            disputesToManage: [],
            securityQuestion,
            securityQuestionAnswer: hashedSecurityQuestionAnswer,
        })

        // Saving new User
        const registeredUser = await user.save()
        res.status(200).json({
            message: 'User successfully registered!',
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
            message: 'username and password properties are required!',
            data: null,
            ok: false,
        })
    }

    try {
        const user = await UserModel.findOne({
            username,
        })

        if (!user) return res.status(400).json({ message: 'User not found', data: null, ok: false })

        const validPassword = await bcrypt.compare(req.body.password, user!.password)

        if (!validPassword) return res.status(400).json({ message: 'User not found', data: null, ok: false })

        const token = await jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_KEY as jwt.Secret)

        return res
            .status(200)
            .header('Authorization', `Bearer ${token}`)
            .json({ message: 'Login Success!', data: { user, token }, ok: true })
    } catch (error) {
        return res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const getSecurityQuestion = async (req: Request, res: Response) => {
    // destructure the payload attached to the body
    const { username } = req.body

    // Check if appropriate payload is attached to the body
    if (!username) {
        return res.status(400).json({
            message: 'username property is required!',
            data: null,
            ok: false,
        })
    }

    try {
        // Check if the username already exists in the db
        const existingUser = await UserModel.findOne({
            username: username,
        })
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist!', data: null, ok: false })
        }

        res.status(200).json({
            message: 'Security questions successfully fetched!',
            data: {
                username: existingUser.username,
                securityQuestion: existingUser.securityQuestion,
            },
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const verifySecurityQA = async (req: Request, res: Response) => {
    // destructure the payload attached to the body
    const { username, securityQuestionAnswer } = req.body

    // Check if appropriate payload is attached to the body
    if (!username || !securityQuestionAnswer) {
        return res.status(400).json({
            message: 'username and securityQuestionAnswer properties are required!',
            data: null,
            ok: false,
        })
    }

    try {
        // Check if the username already exists in the db
        const existingUser = await UserModel.findOne({
            username,
        })
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid auth!', data: null, ok: false })
        }

        const isMatch = await bcrypt.compare(securityQuestionAnswer, existingUser.securityQuestionAnswer)
        // Check if the security question answer matches existing user's answer
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid auth!', data: null, ok: false })
        }

        res.status(200).json({
            message: 'Security question answered successfully!',
            data: existingUser.username,
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    // destructure the payload attached to the body
    const { username, password, confirmPassword } = req.body

    // Check if appropriate payload is attached to the body
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({
            message: 'username, password, and confirmPassword properties are required!',
            data: null,
            ok: false,
        })
    }

    // Check if password and confirmPassword matches
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Password does not match!',
            data: null,
            ok: false,
        })
    }

    try {
        // Hashing new password
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(password, salt)

        // Update user password
        const user = await UserModel.findOne({ username })
        user!.password = newHashedPassword
        await user!.save()

        res.status(200).json({
            message: 'Password Reset Successful!',
            data: { username: user!.username, _id: user!._id },
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}
