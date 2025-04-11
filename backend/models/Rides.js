import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  pickupLocation: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  pricePerSeat: { type: Number, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true });

const RideModel = mongoose.model('ride', rideSchema);
export default RideModel;
