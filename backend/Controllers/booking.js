// controllers/bookingController.js
import Booking from "../models/BookingSchema.js";
import Artist from "../models/ArtistSchema.js";
import User from "../models/UserSchema.js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const createCheckoutSession = async (req, res) => {
  const { artistId } = req.params;
  const { date, timeSlot } = req.body;
  const userId = req.userId;
  const uuid = uuidv4();

  try {
    const artist = await Artist.findById(artistId);
    const user = await User.findById(userId);

    if (!artist || !user) {
      return res.status(404).json({ message: "Artist or User not found" });
    }

    const booking = new Booking({
      artist: artistId,
      user: userId,
      ticketPrice: artist.ticketPrice,
      timeSlot,
      payment: {
        method: "eSewa",
        transactionId: uuid,
        amountPaid: artist.ticketPrice,
      },
    });

    await booking.save();

    const secretKey = "8gBm/:&EnhH.1/q";
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(
        `total_amount=${artist.ticketPrice},transaction_uuid=${uuid},product_code=EPAYTEST`
      )
      .digest("base64");

    const formData = {
      amount: artist.ticketPrice,
      tax_amount: 0,
      total_amount: artist.ticketPrice,
      transaction_uuid: uuid,
      product_code: "EPAYTEST",
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: process.env.SUCCESS_URL,
      failure_url: process.env.FAILURE_URL,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
    };

    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getBookings = async (req, res) => {
//   const userId = req.userId;

//   try {
//     const bookings = await Booking.find({ user: userId }).populate("artist");

//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
