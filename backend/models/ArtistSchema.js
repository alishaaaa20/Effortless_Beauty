import mongoose from "mongoose";
import crypto from "crypto";

const ArtistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  location: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String },
  specialization: { type: String },
  qualifications: { type: Array },
  experiences: { type: Array },
  gallaryPhotos: { type: [String] },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  verified: { type: Boolean, default: false },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  documentName: { type: String },
  documentNumber: { type: String },
  documentPhotos: [String],
});

ArtistSchema.pre("save", function (next) {
  if (this.isModified("documentNumber")) {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.alloc(32, process.env.ENCRYPTION_KEY, "hex"),
      Buffer.alloc(16, process.env.IV, "hex")
    );
    let encrypted = cipher.update(this.documentNumber, "utf8", "hex");
    encrypted += cipher.final("hex");
    this.documentNumber = encrypted;
  }
  next();
});

export default mongoose.model("Makeup Artist", ArtistSchema);
