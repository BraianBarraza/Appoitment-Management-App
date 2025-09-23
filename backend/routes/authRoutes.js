import express from 'express';
import {signUp, confirmAccount, login, user} from "../controllers/authController.js"
import authMiddleware from "../middelware/authMiddleware.js"

const router = express.Router();

//Authentication routes and Login
router.post('/sign-up', signUp);
router.get('/confirm-account/:token', confirmAccount);
router.post('/login', login);

//JWT Required for the routes below
router.get('/user', authMiddleware, user);

export default router;
