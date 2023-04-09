require('dotenv').config()

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

// Import all routes
// import UserRoute from "./routes/users"
import AuthRoute from './routes/auth'
import ListingRoute from './routes/listing'
import UserRoute from './routes/user'

mongoose.set('strictQuery', false)

// Define the server
const app = express()

// Environment Variables
const PORT = process.env.BACKEND_SERVER_PORT
const MONGODB_URL = process.env.MONGODB_URL

// Middleware
app.use(express.json()) // This allows for requests to be accessed, turns req -> JSON object (body can be accessed &)
app.use(helmet())
app.use(morgan('common'))
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
app.use((req: Request, res: Response, next: Function) => {
    console.log(req.path, req.method)
    next()
})

// Declare Routes
app.use('/api/auth', AuthRoute)
app.use('/api/listing', ListingRoute)
app.use('/api/user', UserRoute)

mongoose.connect(MONGODB_URL!).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})
