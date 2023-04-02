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
      type: String,
      required: true,
    },
    biddedItems: {
      type: [ObjectId],
      ref: "Item",
    },
    listedItems: {
      type: [ObjectId],
      ref: "Item",
    },
    wonItems: {
      type: [ObjectId],
      ref: "Item",
    },
    disputedItems: {
      type: [ObjectId],
      ref: "Item",
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
