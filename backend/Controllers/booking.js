import User from "./../models/UserSchema.js";
import Booking from "./../models/BookingSchema.js";
import Artist from "./../models/ArtistSchema.js";
import axios from "axios";

// Handler to create a checkout session
export const getCheckoutSession = async (req, res) => {
  try {
    // Get the artist and user details
    const artist = await Artist.findById(req.params.artistId);
    const user = await User.findById(req.params.userId);

    if (!artist || !user) {
      return res.status(404).json({
        status: "error",
        message: "Artist or User not found",
      });
    }

    // eSewa payment details
    const paymentDetails = {
      amt: artist.ticketPrice, // Amount to be paid
      psc: 0, // Service charge
      pdc: 0, // Delivery charge
      tAmt: artist.ticketPrice, // Total amount
      pid: `booking-${new Date().getTime()}`, // Unique payment ID
      scd: process.env.ESEWA_MERCHANT_CODE, // Merchant code
      su: `${process.env.CLIENT_SITE_URL}/checkout-success?artistId=${req.params.artistId}&userId=${req.params.userId}`, // Success URL with artistId and userId
      fu: `${process.env.CLIENT_SITE_URL}/checkout-failure`, // Failure URL
    };

    // eSewa payment URL
    const paymentUrl = `${process.env.ESEWA_URL}/epay/main`;

    // Prepare query string for eSewa redirect
    const queryString = new URLSearchParams(paymentDetails).toString();

    // Respond with the eSewa payment URL
    res.status(200).json({
      status: "success",
      data: {
        paymentUrl: `${paymentUrl}?${queryString}`, // Constructed eSewa payment URL
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Success handler for eSewa payment
export const esewaSuccess = async (req, res) => {
  try {
    const { oid, amt, refId, artistId, userId } = req.query;

    // Verify the payment with eSewa
    const verificationResponse = await axios.post(
      `${process.env.ESEWA_URL}/epay/transrec`,
      null,
      {
        params: {
          amt,
          rid: refId,
          pid: oid,
          scd: process.env.ESEWA_MERCHANT_CODE,
        },
      }
    );

    if (
      verificationResponse.data.includes(
        "<response_code>Success</response_code>"
      )
    ) {
      // Save the booking
      const booking = new Booking({
        artist: artistId,
        user: userId,
        ticketPrice: amt,
        paymentId: oid,
      });
      await booking.save();

      res.redirect(`${process.env.CLIENT_SITE_URL}/checkout-success`);
    } else {
      throw new Error("Payment verification failed");
    }
  } catch (error) {
    res.redirect(`${process.env.CLIENT_SITE_URL}/checkout-failure`);
  }
};

// Failure handler for eSewa payment
export const esewaFailure = (req, res) => {
  res.redirect(`${process.env.CLIENT_SITE_URL}/checkout-failure`);
};
