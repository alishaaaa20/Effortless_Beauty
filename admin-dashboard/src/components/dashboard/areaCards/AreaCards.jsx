import React, { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [artistCounts, setArtistCounts] = useState({
    approved: 0,
    pending: 0,
    cancelled: 0,
    total: 0,
  });
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchArtistCounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/artists/status/counts"
        );
        const data = await response.json();
        console.log(data, "artist counts");
        if (data.success) {
          setArtistCounts(data.data);
        } else {
          console.error("Failed to fetch artist counts");
        }
      } catch (error) {
        console.error("Error fetching artist counts:", error);
      }
    };

    fetchArtistCounts();
  }, []);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/users/total"
        );
        const data = await response.json();
        console.log(data, "total customers");
        if (data.success) {
          setTotalCustomers(data.data);
        } else {
          console.error("Failed to fetch total customers");
        }
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    fetchTotalCustomers();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        cardInfo={{
          title: "Total Artists",
          value: artistCounts.total.toString(),
          text: `We have ${artistCounts.total} artists.`,
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Approved Artists",
          value: artistCounts.approved.toString(),
          text: `We have ${artistCounts.approved} approved artists.`,
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Pending Artists",
          value: artistCounts.pending.toString(),
          text: `We have ${artistCounts.pending} pending artists.`,
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Cancelled Artists",
          value: artistCounts.cancelled.toString(),
          text: `We have ${artistCounts.cancelled} cancelled artists.`,
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Total Customers",
          value: totalCustomers.toString(),
          text: `We have ${totalCustomers}  customers.`,
        }}
      />
    </section>
  );
};

export default AreaCards;
