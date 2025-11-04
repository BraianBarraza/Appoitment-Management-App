import express from 'express';
import {signUp, confirmAccount, login, user, forgotPassword} from "../controllers/authController.js"
import authMiddleware from "../middelware/authMiddleware.js"

const router = express.Router();

//Authentication routes and Login
router.post('/sign-up', signUp);
router.get('/confirm-account/:token', confirmAccount);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

//JWT Required for the routes below
router.get('/user', authMiddleware, user);

export default router;
