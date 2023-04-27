import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Setting up Schema of User
const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
			default: "",
		},
		email: {
			type: String,
			required: true,
		},
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
			streetAddress: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			zipcode: {
				type: Number,
				required: true,
			},
		},
		balance: {
			type: Number,
			required: true,
		},
		biddedListings: [
			{
				type: ObjectId,
				ref: "Listing",
			},
		],
		listedListings: [
			{
				type: ObjectId,
				ref: "Listing",
			},
		],
		wonListings: [
			{
				type: ObjectId,
				ref: "Listing",
			},
		],
		disputedListings: [
			{
				type: ObjectId,
				ref: "Listing",
			},
		],
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		disputesToManage: [
			{
				type: ObjectId,
				ref: "ExpiredListing",
			},
		],
		reportedListings: [
			{
				type: ObjectId,
				ref: "Listing",
			},
		],
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
