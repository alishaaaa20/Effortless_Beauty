import mongoose from "mongoose";
import Artist from "./ArtistSchema.js";
import User from "./UserSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Types.ObjectId,
      ref: Artist.modelName,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    photos: {
      type: [String], // Array of URLs to the photos
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (artistId) {
  const stats = await this.aggregate([
    {
      $match: { artist: artistId },
    },
    {
      $group: {
        _id: "$artist",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Artist.findByIdAndUpdate(artistId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.artist);
});

export default mongoose.model("Review", reviewSchema);
