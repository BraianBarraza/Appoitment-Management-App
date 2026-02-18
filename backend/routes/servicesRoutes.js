import express from "express";
import {
    createService,
    deleteService,
    getServiceById,
    getServices,
    updateService
} from "../controllers/servicesController.js";
import authMiddleware from "../middelware/authMiddleware.js";

const router = express.Router();

router.route('/')
    .get(getServices)
    .post(authMiddleware, createService)

router.route('/:id')
    .get(getServiceById)
    .put(authMiddleware, updateService)
    .delete(authMiddleware, deleteService);

export default router;
