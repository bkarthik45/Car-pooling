import express from 'express'
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';
import rideController from '../controllers/rideController.js'
router.use(checkUserAuth);

router.post('/', rideController.postRide);
router.get('/', rideController.getAllRides);
router.get('/my-rides', rideController.getMyRides);

// ✅ PLACE THIS BEFORE :id ROUTES
router.post('/:id/book', rideController.bookRide); 

// These must come AFTER
router.delete('/:id', rideController.deleteRide);
router.put('/:id', rideController.updateRide);
router.get('/:id', rideController.getRideById);


export default router;