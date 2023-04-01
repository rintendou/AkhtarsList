require("dotenv").config({ path: "../.env" })

import express, { Request, Response } from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

// Import all routes
// import UserRoute from "./routes/users"
// import AuthRoute from "./routes/auth"
// import FriendRoute from "./routes/friends"
// import ChatRoute from "./routes/chat"
// import MessageRoute from "./routes/messages"

mongoose.set("strictQuery", false)

// Define the server
const app = express()

// Environment Variables
const PORT = process.env.BACKEND_SERVER_PORT

// Middleware
app.use(express.json()) // This allows for requests to be accessed, turns req -> JSON object (body can be accessed &)
app.use(helmet())
app.use(morgan("common"))
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)
app.use((req: Request, res: Response, next: Function) => {
  console.log(req.path, req.method)
  next()
})

// Declare Routes
// app.use("/api/users", UserRoute)
// app.use("/api/auth", AuthRoute)
// app.use("/api/chat", ChatRoute)
// app.use("/api/messages", MessageRoute)
// app.use("/api/friends", FriendRoute)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
