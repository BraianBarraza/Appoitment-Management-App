import express from "express";
import {createAppointment} from "../controllers/appointmentController.js";
import authMiddleware from "../middelware/authMiddleware.js";

const router = express.Router();

router.route('/')
    .post(authMiddleware, createAppointment);

export default router;