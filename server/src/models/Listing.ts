import mongoose from "mongoose"
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

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
    desc: {
      type: String,
      required: true,
    },
    image: {},
    bidders: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
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
    dimensions: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
)

const ListingModel = mongoose.model("Listing", ListingSchema)

export default ListingModel
