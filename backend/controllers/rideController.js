import RideModel from "../models/Rides.js";
import BookingModel from "../models/Booking.js";
class RideController {
  static postRide = async (req, res) => {
    try {
      const {
        pickupLocation,
        destination,
        date,
        time,
        seatsAvailable,
        pricePerSeat,
      } = req.body;
      if (
        !pickupLocation ||
        !destination ||
        !date ||
        !time ||
        !seatsAvailable ||
        !pricePerSeat
      ) {
        res
          .status(500)
          .json({ status: "failed", message: "All fields are required" });
      }
      const newRide = new RideModel({
        pickupLocation,
        destination,
        date,
        time,
        seatsAvailable,
        pricePerSeat,
        postedBy: req.user._id,
      });
      await newRide.save();
      res
        .status(201)
        .json({
          status: "success",
          message: "Ride POsted successfully",
          ride: newRide,
        });
    } catch (error) {
      console.error("Post ride error:", error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to post ride" });
    }
  };

  static getAllRides = async (req, res) => {
    try {
      const rides = await RideModel.find().populate("postedBy", "name email");
      res.status(200).json({ status: "success", rides });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          status: "failed",
          message: "Unable to fetch available rides ",
        });
    }
  };
  static getMyRides = async (req, res) => {
    try {
      const userId = req.user._id;
      const rides = await RideModel.find({ postedBy: userId });
      res.status(200).json({ status: "success", rides });
    } catch (error) {
      res
        .status(500)
        .json({ status: "failed", message: "Unable to fetch your rides " });
    }
  };
  static deleteRide = async (req, res) => {
    try {
      const rideId = req.params.id;
      const userId = req.user._id;
      const ride = await RideModel.findById(rideId);
      if (!ride) {
        res.status(500).json({ status: "failed", message: "ride not found " });
      }
      if (ride.postedBy.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ status: "failed", message: "Unauthorized" });
      }
      await RideModel.findByIdAndDelete(rideId);
      res
        .status(200)
        .json({ status: "success", message: "Ride deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Failed to delete ride" });
    }
  };

  static updateRide = async (req, res) => {
    try {
      const rideId = req.params.id;
      const userId = req.user._id;

      const ride = await RideModel.findById(rideId);
      if (!ride) {
        return res
          .status(404)
          .json({ status: "failed", message: "Ride not found" });
      }

      if (ride.postedBy.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ status: "failed", message: "Unauthorized" });
      }

      const updatedRide = await RideModel.findByIdAndUpdate(rideId, req.body, {
        new: true,
      });

      res.status(200).json({
        status: "success",
        message: "Ride updated successfully",
        ride: updatedRide, // ✅ make sure the name matches here
      });
    } catch (error) {
      console.error("Error updating ride:", error);
      res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }
  };

  static getRideById = async (req, res) => {
    try {
      const ride = await RideModel.findById(req.params.id);
      if (!ride) {
        return res
          .status(404)
          .json({ status: "failed", message: "Ride not found" });
      }
      res.status(200).json({ status: "success", ride });
    } catch (error) {
      console.error("Error fetching ride:", error);
      res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }
  };

  static bookRide = async (req, res) => {
    try {
      const rideId = req.params.id;
      const userId = req.user._id;
  
      console.log("🔁 Booking attempt for ride:", rideId, "by user:", userId);
  
      const ride = await RideModel.findById(rideId);
      if (!ride) {
        return res.status(404).json({ status: "failed", message: "Ride not found" });
      }
  
      if (ride.postedBy.toString() === userId.toString()) {
        return res.status(400).json({ status: "failed", message: "You cannot book your own ride" });
      }
  
      if (ride.seatsAvailable <= 0) {
        return res.status(400).json({ status: "failed", message: "No seats available" });
      }
  
      const alreadyBooked = await BookingModel.findOne({ user: userId, ride: rideId });
      if (alreadyBooked) {
        return res.status(400).json({ status: "failed", message: "You already joined this ride" });
      }
  
      // Create new booking
      const booking = new BookingModel({ user: userId, ride: rideId });
      await booking.save();
  
      // Reduce seat count
      ride.seatsAvailable -= 1;
      await ride.save();
  
      console.log("✅ Booking successful:", booking);
  
      return res.status(200).json({ status: "success", message: "Ride booked successfully" });
    } catch (error) {
      console.error("❌ Booking error:", error);
      return res.status(500).json({ status: "failed", message: "Internal server error" });
    }
  };
  
  


}
export default RideController;
