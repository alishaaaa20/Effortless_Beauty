import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: [validators.notEmpty, 'Name is empty']},
  email: { type: String, required: true, unique: true, validate: [
    { validator: validators.notEmpty, msg: 'Email is empty' }
  , { validator: validators.isEmail, msg: 'Invalid email' }
  ]},
  password: { type: String, required: true },
  phone: { type: Number },
  location: { type: [Number], index: { type: '2dsphere', sparse: true}},
  photo: { type: String },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);