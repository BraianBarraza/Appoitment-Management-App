import express from 'express';
import {
    signUp,
    confirmAccount,
    login,
    user,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    admin
} from "../controllers/authController.js"
import authMiddleware from "../middelware/authMiddleware.js"

const router = express.Router();

//Authentication routes and Login
router.post('/sign-up', signUp);
router.get('/confirm-account/:token', confirmAccount);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.route('/new-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword);

//JWT Required for the routes below
router.get('/user', authMiddleware, user);
router.get('/admin', authMiddleware, admin);

export default router;
