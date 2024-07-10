import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Artist from "../models/ArtistSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Getting Profile info ",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // 1. Find all bookings for the current user and populate the 'artist' field
    const bookings = await Booking.find({ user: req.userId }).populate(
      "artist"
    );

    // 2. Extract unique artist ids from the bookings
    const artistIds = bookings.map((booking) => booking.artist._id);

    // 3. Fetch artists' details based on the extracted ids
    const artists = await Artist.find({ _id: { $in: artistIds } }).select(
      "-password"
    );

    // 4. Send response with the fetched artists' details
    res.status(200).json({
      success: true,
      message: "Appointments found",
      data: bookings.map((booking) => ({
        _id: booking._id,
        artist: {
          _id: booking.artist._id,
          name: booking.artist.name,
          email: booking.artist.email,
          photo: booking.artist.photo,
          location: booking.artist.location,
        },
        ticketPrice: booking.ticketPrice,
        bookingDate: booking.bookingDate,
        timeSlots: booking.timeSlots, // Ensure timeSlot is populated in the BookingSchema
        status: booking.status,
        payment: booking.payment,
        isPaid: booking.isPaid,
        createdAt: booking.createdAt,
      })),
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments" });
  }
};

export const getTotalUser = async (req, res) => {
  try {
    const total = await User.countDocuments();
    console.log(total, "total");
    res
      .status(200)
      .json({ success: true, message: "Total Users", data: total });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found okkkk" });
  }
};

export const getUserProfiles = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Getting Profile info ",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};
