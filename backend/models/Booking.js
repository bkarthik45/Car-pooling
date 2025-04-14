import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    ride:{type:mongoose.Schema.Types.ObjectId, ref: 'ride',required:true},
    bookedAt: { type: Date, default: Date.now }

});

const BookingModel = mongoose.model('booking',bookingSchema);
export default BookingModel;