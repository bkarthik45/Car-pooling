// RideMap.js
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const LIBRARIES = ['places'];

const RideMap = ({ pickup, destination }) => {
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [info, setInfo] = useState({ distance: "", duration: "" }); // ✅ For ETA display

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (!isLoaded || !pickup || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          const leg = result.routes[0].legs[0];
          const midLat = (leg.start_location.lat() + leg.end_location.lat()) / 2;
          const midLng = (leg.start_location.lng() + leg.end_location.lng()) / 2;
          setMapCenter({ lat: midLat, lng: midLng });

          // ✅ Save ETA & distance
          setInfo({
            distance: leg.distance?.text || "",
            duration: leg.duration?.text || "",
          });
        } else {
          console.error("❌ Directions request failed:", status);
        }
      }
    );
  }, [isLoaded, pickup, destination]);

  return (
    <div>
      {info.distance && info.duration && (
        <div className="mb-2">
          <strong>Distance:</strong> {info.distance} | <strong>ETA:</strong> {info.duration}
        </div>
      )}
      <div style={{ height: "200px", width: "100%" }}>
        {isLoaded && mapCenter ? (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={mapCenter}
            zoom={8}
            onLoad={(map) => (mapRef.current = map)}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <p>Loading map...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideMap;
