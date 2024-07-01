import Review from "../models/ReviewSchema.js";
import Artist from "../models/ArtistSchema.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user").populate("artist");
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found", error: err });
  }
};

// Create review
export const createReview = async (req, res) => {
  const { artist, reviewText, rating, photos } = req.body;

  if (!artist) req.body.artist = req.params.artistId;
  req.body.user = req.userId;

  try {
    const newReview = new Review({
      artist,
      user: req.body.user,
      reviewText,
      rating,
      photos,
    });

    const savedReview = await newReview.save();

    await Artist.findByIdAndUpdate(req.body.artist, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    if (err.message.includes("Review contains inappropriate language")) {
      res.status(400).json({ success: false, message: err.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: err.message });
    }
  }
};
