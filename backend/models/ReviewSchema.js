import mongoose from "mongoose";
import Artist from "./ArtistSchema.js";
import User from "./UserSchema.js";
import Filter from "bad-words";

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
    },
    photos: {
      type: [String], // Array of URLs to the photos
    },
  },
  { timestamps: true }
);

// Pre-hook for validating review text
reviewSchema.pre("save", function (next) {
  const filter = new Filter();
  if (filter.isProfane(this.reviewText)) {
    const err = new Error(
      "Review contains inappropriate language and cannot be posted."
    );
    next(err);
  } else {
    next();
  }
});

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

  if (stats.length > 0) {
    await Artist.findByIdAndUpdate(artistId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Artist.findByIdAndUpdate(artistId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.artist);
});

reviewSchema.post("remove", function () {
  this.constructor.calcAverageRatings(this.artist);
});

export default mongoose.model("Review", reviewSchema);
