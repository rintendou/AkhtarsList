import mongoose from "mongoose"
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Setting up Schema of User
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    securityQuestion: {
      type: String,
      required: true,
    },
    securityQuestionAnswer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    biddedListings: {
      type: [ObjectId],
      ref: "Item",
    },
    listedListings: {
      type: [ObjectId],
      ref: "Item",
    },
    wonListings: {
      type: [ObjectId],
      ref: "Item",
    },
    disputedListings: {
      type: [ObjectId],
      ref: "Item",
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
