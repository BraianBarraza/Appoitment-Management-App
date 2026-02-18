import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.id).select('-password -token -verified -__v');

            if (!req.user) {
                const error = new Error('User not found');
                return res.status(401).json({msg: error.message})
            }

            next()
        } catch(err) {
            const error = new Error('Invalid or missing token');
            return res.status(403).json({msg: error.message})
        }
    } else {
        const error = new Error('Invalid or missing token');
        return res.status(403).json({msg: error.message})
    }
}

export default authMiddleware
