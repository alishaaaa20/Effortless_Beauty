import mongoose from "mongoose";
import Artist from "./ArtistSchema.js";
import User from "./UserSchema.js";

const bookingSchema = new mongoose.Schema(
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
    ticketPrice: { type: Number, required: true },
    // bookingDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    payment: {
      method: { type: String, required: true },
      transactionId: { type: String },
      amountPaid: { type: Number, required: true }, // Track amount paid
    },
    isPaid: { type: Boolean, default: false },
    isPartiallyPaid: { type: Boolean, default: false }, // New field for partial payment
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
