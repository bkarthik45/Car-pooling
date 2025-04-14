// EditRide.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const EditRide = () => {
  const { id } = useParams(); // Get ride ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    seatsAvailable: "",
    pricePerSeat: "",
  });

  // Fetch existing ride
  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await API.get(`/rides/${id}`);
        if (res.data.status === "success") {
          setFormData(res.data.ride);
        } else {
          toast.error("Failed to load ride details");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching ride");
      }
    };
    fetchRide();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/rides/${id}`, formData);
      if (res.data.status === "success") {
        toast.success("Ride updated!");
        navigate("/my-rides");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating ride");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Ride</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          className="form-control mb-3"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup location"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
        />
        <input
          type="date"
          className="form-control mb-3"
          name="date"
          value={formData.date.split("T")[0]} // for ISO date
          onChange={handleChange}
        />
        <input
          type="time"
          className="form-control mb-3"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-3"
          name="seatsAvailable"
          value={formData.seatsAvailable}
          onChange={handleChange}
          placeholder="Seats available"
        />
        <input
          type="number"
          className="form-control mb-3"
          name="pricePerSeat"
          value={formData.pricePerSeat}
          onChange={handleChange}
          placeholder="Price per seat"
        />

        <button className="btn btn-primary w-100" type="submit">
          Update Ride
        </button>
      </form>
    </div>
  );
};

export default EditRide;
