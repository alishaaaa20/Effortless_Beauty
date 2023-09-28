
//import { artists } from "../../assets/data/artists";
 //import ArtistCard from "../../components/Artists/ArtistCard";

 import React, { useState, useEffect } from "react";

 const Artists = () => {
   const [map, setMap] = useState(null);
   const [searchInput, setSearchInput] = useState("");
   const [mapVisible, setMapVisible] = useState(false);
 
   const handleShowMap = () => {
     setMapVisible(true);
   };
 
   const handleSearch = () => {
     // Use the Google Maps Geocoding API to convert the search input to coordinates
     const geocoder = new window.google.maps.Geocoder();
 
     geocoder.geocode({ address: searchInput }, (results, status) => {
       if (status === "OK" && results[0]) {
         const location = results[0].geometry.location;
         
         // Create a new map centered at the location
         const newMap = new window.google.maps.Map(document.getElementById("map"), {
           center: location,
           zoom: 10, // Adjust the zoom level as needed
         });
 
         // Create a marker at the location
         const marker = new window.google.maps.Marker({
           position: location,
           map: newMap,
           title: searchInput,
         });
 
         setMap(newMap);
         setMapVisible(true);
       } else {
         alert("Location not found. Please enter a valid location.");
       }
     });
   };
 
   useEffect(() => {
     // Load the Google Maps JavaScript API script dynamically
     const script = document.createElement("script");
     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
     script.async = true;
     script.onload = handleScriptLoad;
     document.head.appendChild(script);
   }, []);
 
   const handleScriptLoad = () => {
     // Initialize the Google Maps API
     window.google.maps.event.addDomListener(window, "load", () => {
       const initialMap = new window.google.maps.Map(document.getElementById("map"), {
         center: { lat: 28.6139, lng: 77.2090 }, // Default center for Nepal
         zoom: 7, // Default zoom level
       });
       setMap(initialMap);
     });
   };
 
   return (
     <section className="bg-[#fff9ea]">
       <div className="container text-center">
         <h2 className="heading">Find a Makeup Artist</h2>
         <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
           <input
             type="text"
             placeholder="Enter your location"
             value={searchInput}
             onChange={(e) => setSearchInput(e.target.value)}
             className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
           />
           <button
             onClick={handleSearch}
             className="btn mt-0 rounded-[0px] rounded-r-md"
           >
             Search
           </button>
         </div>
         {mapVisible && (
           <div className="mt-4">
             <div id="map" style={{ width: "100%", height: "400px" }}></div>
           </div>
         )}
       </div>
     </section>

  
   );
   <section>
    <div className="container">
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {Artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
        ))}

    </div>
    </div>
   </section>
 };
 
 export default Artists;
 