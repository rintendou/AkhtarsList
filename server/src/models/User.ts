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
      ref: "Items",
    },
    listedItems: {
      type: [ObjectId],
      ref: "Items",
    },
    wonItems: {
      type: [ObjectId],
      ref: "Items",
    },
    disputedItems: {
      type: [ObjectId],
      ref: "Items",
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
