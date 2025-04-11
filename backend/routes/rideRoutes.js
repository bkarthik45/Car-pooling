import express from 'express'
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';
import rideController from '../controllers/rideController.js'

//protect all ride routes
router.use(checkUserAuth)
router.post('/',rideController.postRide);

export default router;