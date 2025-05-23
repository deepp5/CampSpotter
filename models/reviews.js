const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Creates Mongoose's Schema constructor.

// Define the structure of the Campground in database
const ReviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
});
//generate the collection name as "reviews" and export
module.exports = mongoose.model("Review", ReviewSchema);
