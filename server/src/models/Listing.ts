import mongoose from "mongoose"
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// Setting up Schema of Lsting
const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lister: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    listerUsername: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bidders: [
      {
        type: String,
        default: [],
      },
    ],
    transactions: [
      {
        type: String,
        default: [],
      },
    ],
    bestBidder: {
      type: ObjectId,
      ref: "User",
    },
    startPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    views: {
      type: Number,
    },
    category: {
      type: String,
    },
    weight: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    // status: active, expired, sold, disputed
    dimensions: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
)

const ListingModel = mongoose.model("Listing", ListingSchema)

export default ListingModel
