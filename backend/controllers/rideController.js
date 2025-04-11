import RideModel from "../models/Rides.js";
class RideController{
    static postRide = async(req,res)=>{
        try{
            const{pickupLocation, destination, date, time , seatsAvailable, pricePerSeat }=req.body
            if(!pickupLocation ||  !destination || !date || !time || !seatsAvailable || !pricePerSeat){
                res.status(500).json({status:"failed", message:"All fields are required"})
    
            }
            const newRide = new RideModel({
                pickupLocation, destination, date, time , seatsAvailable, pricePerSeat,postedBy: req.user._id
            });
            await newRide.save();
            res.status(201).json({status:"success", message:"Ride POsted successfully", ride:newRide})
    
        }catch(error){
            console.error("Post ride error:", error);
          res.status(500).json({ status: "failed", message: "Unable to post ride" });
    
        }
    }
}
export default RideController;
