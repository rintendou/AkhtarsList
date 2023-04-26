import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User'
import mongoose from 'mongoose'
import JWTRequest from '../lib/types/JWTRequest'
import verifyPasswordStrength from '../lib/util/verifyPasswordStrength'
import verifyEmail from '../lib/util/verifyEmail'

export const registerUser = async (req: Request, res: Response) => {
    // destructure the payload attached to the body
    const { fullName, email, username, password, confirmPassword, address, securityQuestion, securityQuestionAnswer } =
        req.body

    // Check if appropriate payload is attached to the body
    if (
        !fullName ||
        !email ||
        !username ||
        !password ||
        !confirmPassword ||
        !address ||
        !securityQuestion ||
        !securityQuestionAnswer
    ) {
        return res.status(400).json({
            message:
                'fullName, email, username, password, confirmPassword, address, securityQuestion, and securityQuestionAnswer properties are required!',
            data: null,
            ok: false,
        })
    }

    if (!verifyEmail(email)) {
        return res.status(400).json({
            message: 'Invalid email.',
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

    // Check if password strength is sufficient
    if (!verifyPasswordStrength(password)) {
        return res.status(400).json({
            message:
                'Password must have at least 8 characters long, one uppercase, one lowercase, one number, and one special character!',
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

        // Clean the username by removing whitespaces and converting to lowercase
        const cleanedUsername = username.toLowerCase().replace(/\s+/g, '') // '  hello world ' -> 'helloworld'

        // Check if the username already exists in the db
        const existingUser = await UserModel.findOne({
            username: cleanedUsername.toLowerCase(),
        })
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists!', data: null, ok: false })
        }

        // Creating new User
        const user = new UserModel({
            fullName,
            email: email.trim(),
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
            username: username.toLowerCase(),
        })

        if (!user) return res.status(400).json({ message: 'User not found', data: null, ok: false })

        const validPassword = await bcrypt.compare(req.body.password, user!.password)

        if (!validPassword) return res.status(400).json({ message: 'User not found', data: null, ok: false })

        const token = jwt.sign({ _idFromToken: user._id }, process.env.JWT_KEY as jwt.Secret)

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

    // Check if password strength is sufficient
    if (!verifyPasswordStrength(password)) {
        return res.status(400).json({
            message:
                'Password must have at least 8 characters long, one uppercase, one lowercase, one number, and one special character!',
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

        // Check if new password matches old password
        const doesOldPasswordMatch = await bcrypt.compare(password, user!.password)
        if (doesOldPasswordMatch) {
            return res.status(400).json({
                message: 'New password cannot be the same as the old password!',
                data: null,
                ok: false,
            })
        }

        res.status(200).json({
            message: 'Password Reset Successful!',
            data: { username: user!.username, _id: user!._id },
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const changeUserDetails = async (req: JWTRequest, res: Response) => {
    // Destructure the payload attached to the body
    const { fullName, email, userId, password, address } = req.body

    // Check if appropriate payload is attached to the body
    if (!userId || !email || !password || !fullName || !address) {
        return res.status(400).json({
            message: 'Full Name, Email, Password and Address properties are required!',
            data: null,
            ok: false,
        })
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId!', data: null, ok: false })
    }

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user has an id equal to the id from the token
    if (userId !== _idFromToken) {
        return res.status(400).json({ message: 'Invalid Credentials!', data: null, ok: false })
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ _id: userId })
    if (!existingUser) {
        return res.status(400).json({ message: 'Bad Request!', data: null, ok: false })
    }

    // Check if password matches user password
    const doesPasswordMatch = await bcrypt.compare(password, existingUser.password)
    if (!doesPasswordMatch) {
        return res.status(400).json({
            message: 'You provided the wrong password!',
            data: null,
            ok: false,
        })
    }

    // Check if newEmail matches current email
    if (email == existingUser.email!) {
        return res.status(400).json({
            message: 'You cannot change your email to the same email!',
            data: null,
            ok: false,
        })
    }

    try {
        // Update user details
        existingUser.address = address
        existingUser.fullName = fullName
        existingUser.email = email
        await existingUser.save()

        res.status(200).json({
            message: 'User Details Updated Successfully!',
            data: null,
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const changePassword = async (req: JWTRequest, res: Response) => {
    // Destructure the payload attached to the body
    const { userId, oldPassword, newPassword, newConfirmPassword } = req.body

    // Check if appropriate payload is attached to the body
    if (!oldPassword || !newPassword || !newConfirmPassword) {
        return res.status(400).json({
            message: 'Old Password, New Password, and Confirm Password properties are required!',
            data: null,
            ok: false,
        })
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId!', data: null, ok: false })
    }

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user has an id equal to the id from the token
    if (userId !== _idFromToken) {
        return res.status(400).json({ message: 'Invalid Credentials!', data: null, ok: false })
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ _id: userId })
    if (!existingUser) {
        return res.status(400).json({ message: 'Bad Request!', data: null, ok: false })
    }

    // Check if password and confirmPassword matches
    if (newPassword !== newConfirmPassword) {
        return res.status(400).json({
            message: 'New Password does not match!',
            data: null,
            ok: false,
        })
    }

    // Check if new password strength is sufficient
    if (!verifyPasswordStrength(newPassword)) {
        return res.status(400).json({
            message:
                'New password must have at least 8 characters long, one uppercase, one lowercase, one number, and one special character!',
            data: null,
            ok: false,
        })
    }

    // Check if old password matches user password
    const doesOldPasswordMatch = await bcrypt.compare(oldPassword, existingUser.password)
    if (!doesOldPasswordMatch) {
        return res.status(400).json({
            message: 'You provided the wrong password!',
            data: null,
            ok: false,
        })
    }

    // Check if oldPassword and newPassword matches
    const didPasswordEvenChange = await bcrypt.compare(newPassword, existingUser.password)
    if (didPasswordEvenChange) {
        return res.status(400).json({
            message: 'New password cannot match your old password!',
            data: null,
            ok: false,
        })
    }

    try {
        // Hashing new password
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newPassword, salt)

        // Update user password
        existingUser.password = newHashedPassword
        await existingUser!.save()

        res.status(200).json({
            message: 'Password Changed Successful!',
            data: null,
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}

export const changeSecurityQA = async (req: JWTRequest, res: Response) => {
    // destructure the payload attached to the body
    const { userId, password, newSecurityQuestion, newSecurityQAnswer } = req.body

    // Check if appropriate payload is attached to the body
    if (!password || !newSecurityQuestion || !newSecurityQAnswer) {
        return res.status(400).json({
            message: 'New Security Question, New Security Question Answer, and Password properties are required!',
            data: null,
            ok: false,
        })
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId!', data: null, ok: false })
    }

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user has an id equal to the id from the token
    if (userId !== _idFromToken) {
        return res.status(400).json({ message: 'Invalid Credentials!', data: null, ok: false })
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ _id: userId })
    if (!existingUser) {
        return res.status(400).json({ message: 'Bad Request!', data: null, ok: false })
    }

    // Check if password matches user password
    const doesPasswordMatch = await bcrypt.compare(password, existingUser.password)
    if (!doesPasswordMatch) {
        return res.status(400).json({
            message: 'You provided the wrong password!',
            data: null,
            ok: false,
        })
    }

    try {
        // Hashing new security question answer
        const salt = await bcrypt.genSalt(10)
        const hashedSecurityQAnswer = await bcrypt.hash(newSecurityQAnswer, salt)

        // Update user security qa
        existingUser.securityQuestion = newSecurityQuestion
        existingUser.securityQuestionAnswer = hashedSecurityQAnswer
        await existingUser!.save()

        res.status(200).json({
            message: 'Security QA Updated Successfully!',
            data: null,
            ok: true,
        })
    } catch (error) {
        res.status(500).json({ message: error, data: null, ok: false })
    }
}
