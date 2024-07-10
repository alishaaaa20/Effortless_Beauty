import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  location: { type: String },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    required: true,
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  verified: { type: Boolean, default: false },
  documentName: { type: String },
  documentNumber: { type: String },
  documentPhotos: [String],
});

UserSchema.pre("save", function (next) {
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

export default mongoose.model("User", UserSchema);
