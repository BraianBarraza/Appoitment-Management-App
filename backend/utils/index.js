import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {format} from "date-fns";
import crypto from "crypto";

function validateObjectId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('The provided ID is invalid');
        return res.status(400).json({
            msg: error.message,
        })
    }
}

function handleNotFoundError(message, res) {
    const error = new Error(message);
    return res.status(404).json({
        msg: error.message,
    })
}

const uniqueId = () => crypto.randomBytes(20).toString('hex');

const generateJWT = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })

    return token;
}

function formatDate(date) {
    return format(date, 'PPPP');
}
export {
    validateObjectId,
    handleNotFoundError,
    uniqueId,
    generateJWT,
    formatDate,
}
