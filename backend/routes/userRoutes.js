import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js'
import checkUserAuth from '../middlewares/auth-middleware.js';


//Route level middleware - To protect Route
router.use('/changepassword',checkUserAuth)
router.use('/loggedUser',checkUserAuth)

//Public Routes
router.post('/register',UserController.userRegistration)
router.post('/login',UserController.userLogin)

router.post('/send-reset-password-email',UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',UserController.userPasswordReset)



//Protected Routes
router.post('/changepassword',UserController.changeuserPassword)
router.post('/loggedUser',UserController.loggedUser)




export default router