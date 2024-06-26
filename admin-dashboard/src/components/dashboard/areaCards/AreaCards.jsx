import React, { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchTotalArtists = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/artists/total"
        );
        const data = await response.json();
        console.log(data, "total artists");
        if (data.success) {
          setTotalArtists(data.data);
        } else {
          console.error("Failed to fetch total artists");
        }
      } catch (error) {
        console.error("Error fetching total artists:", error);
      }
    };

    fetchTotalArtists();
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
          value: totalArtists.toString(),
          text: `We have ${totalArtists} artists.`,
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Today's Customers",
          value: totalCustomers.toString(),
          text: `We have ${totalCustomers} customers.`,
        }}
      />
    </section>
  );
};

export default AreaCards;
