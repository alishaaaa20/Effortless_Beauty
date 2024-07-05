import mongoose from "mongoose";

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
});

export default mongoose.model("User", UserSchema);
