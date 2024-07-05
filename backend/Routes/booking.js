import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  getAppointments,
} from "../Controllers/bookingController.js";
import { createCheckoutSession } from "../Controllers/booking.js";
import { verifyTransaction } from "../Controllers/eSewaPaymentConfirmation.js";

const router = express.Router();

router.get("/appointments", authenticate, getAppointments);
// Booking routes
router.post("/", authenticate, createBooking);
router.get("/:id", authenticate, getBooking);
router.get("/", authenticate, getAllBooking);

// Payment routes
router.post("/checkout-session/:artistId", authenticate, createCheckoutSession);
router.post("/verify-transaction", authenticate, verifyTransaction);

export default router;
