import express from 'express'
import authMiddleware from "../middelware/authMiddleware.js";
import {getUserAppointments} from "../controllers/userController.js";

const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)

export default router