import express from 'express';
import {signUp, confirmAccount, login} from "../controllers/authController.js"

const router = express.Router();

//Authentication routes and Login
router.post('/sign-up', signUp);
router.get('/confirm-account/:token', confirmAccount);
router.post('/login', login);

export default router;
