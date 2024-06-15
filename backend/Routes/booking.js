import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../Controllers/bookingController.js";
import {
  getCheckoutSession,
  esewaSuccess,
  esewaFailure,
} from "../Controllers/booking.js";

const router = express.Router();

// Booking routes
router.post("/", authenticate, createBooking);
router.get("/:id", authenticate, getBooking);
router.get("/", authenticate, getAllBooking);

// Payment routes
router.post("/checkout-session/:artistId", authenticate, getCheckoutSession);
router.get("/checkout-success", esewaSuccess);
router.get("/checkout-failure", esewaFailure);

export default router;
