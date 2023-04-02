import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Setting up Schema of Lsting
const ListingSchema = new Schema(
    {
        bidders: {},
        lister: {},
        title: {},
        desc: {},
        startPrice: {},
        currPrice: {},
        endDateAndTime: {},
        views: {},
        category: {},
        weight: {},
        dimensions: {},
    },
    { timestamps: true }
)

const ListingModel = mongoose.model('Listing', ListingSchema)

export default ListingModel
