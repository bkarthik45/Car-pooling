import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    isDriver: false,
    carModel: "",
    carPlate: "",
    seats: "",
  });

  // ⬇️ Fetch existing profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        if (res.data.status === "success") {
          const user = res.data.user;
          // Fill form with existing data or default to empty values
          setProfile({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            isDriver: user.isDriver || false,
            carModel: user.carModel || "",
            carPlate: user.carPlate || "",
            seats: user.seats || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile");
        console.error("Profile fetch error", error);
      }
    };

    fetchProfile();
  }, []);

  // ⬇️ Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ⬇️ Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/user/profile", profile);
      if (res.data.status === "success") {
        toast.success("Profile updated successfully!");
        setProfile({
          ...res.data.user, // Update with saved values from backend
        });
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error", error);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={profile.email}
            readOnly
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>

        {/* Is Driver */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isDriver"
            name="isDriver"
            checked={profile.isDriver}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isDriver">
            Are you a driver?
          </label>
        </div>

        {/* Car Model */}
        <div className="mb-3">
          <label className="form-label">Car Model</label>
          <input
            type="text"
            name="carModel"
            className="form-control"
            value={profile.carModel}
            onChange={handleChange}
            placeholder="e.g. Toyota Camry"
          />
        </div>

        {/* Car Plate */}
        <div className="mb-3">
          <label className="form-label">Car Plate</label>
          <input
            type="text"
            name="carPlate"
            className="form-control"
            value={profile.carPlate}
            onChange={handleChange}
            placeholder="e.g. AP09CD1234"
          />
        </div>

        {/* Seats */}
        <div className="mb-3">
          <label className="form-label">Seats Available</label>
          <input
            type="number"
            name="seats"
            className="form-control"
            value={profile.seats}
            onChange={handleChange}
            placeholder="e.g. 3"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
