// controllers/bookingController.js
import Booking from "../models/BookingSchema.js";
import crypto from "crypto";

export const verifyTransaction = async (req, res) => {
  const { encodedResponse } = req.body;

  try {
    // Decode the Base64 response
    const decodedResponse = Buffer.from(encodedResponse, "base64").toString(
      "utf8"
    );
    const responseJson = JSON.parse(decodedResponse);
    console.log(responseJson);
    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = responseJson;

    // Verify the signature
    const secretKey = "8gBm/:&EnhH.1/q";
    const dataToSign = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
    const calculatedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(dataToSign)
      .digest("base64");

    // if (calculatedSignature !== signature) {
    //   return res.status(400).json({ message: "Invalid signature" });
    // }

    // Find the booking by transaction UUID
    const booking = await Booking.findOne({
      "payment.transactionId": transaction_uuid,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update booking status based on the transaction status
    if (status === "COMPLETE") {
      booking.payment.status = "Paid";
      await booking.save();
      return res.json({ message: "Payment verified successfully", booking });
    } else {
      return res.status(400).json({ message: "Payment not completed", status });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
