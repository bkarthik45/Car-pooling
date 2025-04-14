import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import API from "../services/api";
import { toast } from "react-toastify";

const CreateRide = () => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    seatsAvailable: "",
    pricePerSeat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit logic will go here later
  const {
    ready,
    value: pickupValue,
    setValue: setPickupValue,
    suggestions: { status: pickupStatus, data: pickupSuggestions },
    clearSuggestions: clearPickupSuggestions,
  } = usePlacesAutocomplete();

  const {
    ready: destReady,
    value: destinationValue,
    setValue: setDestinationValue,
    suggestions: { status: destStatus, data: destSuggestions },
    clearSuggestions: clearDestSuggestions,
  } = usePlacesAutocomplete();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/rides", formData);
      if (res.data.status === "success") {
        toast.success("Ride posted successfully!");
        // Clear form if needed:
        setPickupValue("");
        setDestinationValue("");
        setFormData({
          pickupLocation: "",
          destination: "",
          date: "",
          time: "",
          seatsAvailable: "",
          pricePerSeat: "",
        });
      } else {
        toast.error(res.data.message || "Failed to post ride");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Post a Ride</h2>
      <form onSubmit={handleSubmit}>
        {/* Pickup Location Autocomplete */}
        <div className="mb-3">
          <label className="form-label">Pickup Location</label>
          <input
            className="form-control"
            value={pickupValue}
            onChange={(e) => setPickupValue(e.target.value)}
            disabled={!ready}
            placeholder="Enter pickup location"
          />
          {pickupStatus === "OK" && (
            <ul className="list-group position-absolute z-1">
              {pickupSuggestions.map(({ place_id, description }) => (
                <li
                  key={place_id}
                  className="list-group-item list-group-item-action"
                  onClick={async () => {
                    setPickupValue(description, false);
                    clearPickupSuggestions();
                    setFormData((prev) => ({
                      ...prev,
                      pickupLocation: description,
                    }));
                  }}
                >
                  {description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination Autocomplete */}
        <div className="mb-3">
          <label className="form-label">Destination</label>
          <input
            className="form-control"
            value={destinationValue}
            onChange={(e) => setDestinationValue(e.target.value)}
            disabled={!destReady}
            placeholder="Enter destination"
          />
          {destStatus === "OK" && (
            <ul className="list-group position-absolute z-1">
              {destSuggestions.map(({ place_id, description }) => (
                <li
                  key={place_id}
                  className="list-group-item list-group-item-action"
                  onClick={async () => {
                    setDestinationValue(description, false);
                    clearDestSuggestions();
                    setFormData((prev) => ({
                      ...prev,
                      destination: description,
                    }));
                  }}
                >
                  {description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seats Available</label>
          <input
            type="number"
            className="form-control"
            name="seatsAvailable"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price per Seat</label>
          <input
            type="number"
            className="form-control"
            name="pricePerSeat"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Post Ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
