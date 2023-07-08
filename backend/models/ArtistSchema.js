import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: [validators.notEmpty, 'Name is empty']},
  email: { type: String, required: true, unique: true, validate: [{ validator: validators.notEmpty, msg: 'Email is empty' }, { validator: validators.isEmail, msg: 'Invalid email' }]},
  password: { type: String, required: true },
  phone: { type: Number },
  location: { type: [Number], index: { type: '2dsphere', sparse: true}},
  photo: { type: String },
  servicePrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Makeup Artist", ArtistSchema);