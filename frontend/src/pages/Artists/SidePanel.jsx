import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../utils/config";
import convertTime from "../../utils/convertTime";

const SidePanel = ({ artistId, ticketPrice, timeSlots }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const bookingHandler = async () => {
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${artistId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: selectedDate,
            timeSlot: selectedTimeSlot,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Service unavailable.");
      }

      // Create and submit the form automatically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = [
        { name: "amount", value: data.amount },
        { name: "tax_amount", value: data.tax_amount },
        { name: "total_amount", value: data.total_amount },
        { name: "transaction_uuid", value: data.transaction_uuid },
        { name: "product_code", value: data.product_code },
        { name: "product_service_charge", value: data.product_service_charge },
        {
          name: "product_delivery_charge",
          value: data.product_delivery_charge,
        },
        { name: "success_url", value: data.success_url },
        { name: "failure_url", value: data.failure_url },
        { name: "signed_field_names", value: data.signed_field_names },
        { name: "signature", value: data.signature },
      ];
      console.log(fields);
      fields.forEach(({ name, value }) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Service Price:</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          Rs. {ticketPrice}
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        {timeSlots?.length === 0 ? (
          <p className="text-[15px] leading-6 text-textColor font-semibold mt-5 text-center">
            No time slots available recently
          </p>
        ) : (
          <ul className="mt-3">
            {timeSlots?.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="timeSlot"
                    value={`${item.startingTime}-${item.endingTime}`}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="form-radio"
                  />
                  <span className="text-[15px] leading-6 text-textColor font-semibold">
                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}:{" "}
                    {convertTime(item.startingTime)} -{" "}
                    {convertTime(item.endingTime)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={bookingHandler}
        className="btn px-2 w-full rounded-md"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
};

export default SidePanel;
