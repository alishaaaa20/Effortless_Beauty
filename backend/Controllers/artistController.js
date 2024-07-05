import Artist from "../models/ArtistSchema.js";
import Booking from "../models/BookingSchema.js";
import collaborativeFilteringAlgorithm from "./collaborativeFilteringAlgorithm.js";

export const updateArtist = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  try {
    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedArtist,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Update" });
  }
};

export const deleteArtist = async (req, res) => {
  const id = req.params.id;

  try {
    await Artist.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};

export const getSingleArtist = async (req, res) => {
  const id = req.params.id;

  try {
    const artist = await Artist.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Artist found", data: artist });
  } catch (err) {
    res.status(500).json({ success: false, message: "No artist found" });
  }
};

export const getAllArtist = async (req, res) => {
  try {
    const { query } = req.query;
    let artists;

    if (query) {
      console.log(`Searching artists with query: ${query}`);
      artists = await Artist.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      artists = await collaborativeFilteringAlgorithm();
    }

    if (artists.length > 0) {
      res
        .status(200)
        .json({ success: true, message: "Artists found", data: artists });
    } else {
      res.status(404).json({ success: false, message: "No artists found" });
    }
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getArtistBySearch = async (req, res) => {
  const location = new RegExp(req.query.location, "i");
  const distance = parseInt(req.query.distance);

  try {
    const artists = await Artist.find({
      name: { $regex: req.query.name, $options: "i" },
      specialization: { $regex: req.query.specialization, $options: "i" },
      location: { $regex: req.query.location, $options: "i" },
    });

    res
      .status(200)
      .json({ success: true, message: "Users found", data: artists });
  } catch (err) {
    res.status(500).json({ success: false, message: "Users not found" });
  }
};

export const getArtistProfile = async (req, res) => {
  const artistId = req.userId;

  try {
    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res
        .status(404)
        .json({ success: false, message: "Artist not found" });
    }
    const { password, ...rest } = artist._doc;
    const appointments = await Booking.find({ artist: artistId });
    res.status(200).json({
      success: true,
      message: "Getting Profile info",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getTotalArtist = async (req, res) => {
  try {
    const totalArtists = await Artist.countDocuments();

    console.log(totalArtists, "totalArtists");
    res.status(200).json({
      success: true,
      message: "Total Artists",
      data: totalArtists,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get total" });
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find({}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Artists found", data: artists });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const updateArtistStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!["pending", "approved", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!updatedArtist) {
      return res
        .status(404)
        .json({ success: false, message: "Artist not found" });
    }

    res.status(200).json({
      success: true,
      message: `Artist status updated to ${status}`,
      data: updatedArtist,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update status" });
  }
};

export const getApprovedArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isApproved: "approved" }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Artists found",
      data: artists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get artists",
    });
  }
};

export const getPendingArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isApproved: "pending" }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Artists found",
      data: artists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get artists",
    });
  }
};

export const getCancelledArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isApproved: "cancelled" }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Artists found",
      data: artists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get artists",
    });
  }
};

export const countArtistsByStatus = async (req, res) => {
  try {
    const statusCounts = await Artist.aggregate([
      {
        $group: {
          _id: "$isApproved",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalArtists = await Artist.countDocuments();

    const counts = {
      approved: 0,
      pending: 0,
      cancelled: 0,
      total: totalArtists,
    };

    statusCounts.forEach((statusCount) => {
      counts[statusCount._id] = statusCount.count;
    });

    res.status(200).json({
      success: true,
      message: "Artist counts by status",
      data: counts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get artist counts" });
  }
};
