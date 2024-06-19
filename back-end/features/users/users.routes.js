import express from 'express';
import UserController from './users.controller.js';

const router = express.Router();

const userController = new UserController();

router.get('/get-user-by-id/:userId',userController.getUserFromId);
router.get('/get-user-id-of-logged-in-user',userController.getUserIdOfLoggedInUser);
router.get('/is-follower/:userId',userController.getIsFollower);
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.post('/add-following/:userId',userController.addFollower);
router.post('/send-otp',userController.sendOtp);
router.post('/verify-otp',userController.verifyOtp);
router.post('/update-name',userController.changeUserName);
router.delete('/remove-following/:userId',userController.removeFollowing);
router.delete('/remove-follower/:userId',userController.removeFollower);

export default router;

