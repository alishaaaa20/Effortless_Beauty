import express from "express";
import Booking from "../models/BookingSchema.js";

const router = express.Router();

router.post("/payment-success", async (req, res) => {
  try {
    const { transactionId, amountPaid, bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the amountPaid
    booking.payment.amountPaid += amountPaid;
    booking.payment.transactionId = transactionId; // Update transaction ID if needed

    updatePaymentStatus(booking); // Update the payment status

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successfully completed",
    });
  } catch (err) {
    console.error("Error handling payment success:", err);
    res.status(503).json({
      success: false,
      message: "Service unavailable.",
    });
  }
});

router.get("/payment-cancelled", async (req, res) => {
  try {
    const { bookingId } = req.query;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking status to cancelled
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment was cancelled",
    });
  } catch (err) {
    console.error("Error handling payment cancellation:", err);
    res.status(503).json({
      success: false,
      message: "Service unavailable.",
    });
  }
});

export default router;
