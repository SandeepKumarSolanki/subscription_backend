import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'


const protect = asyncHandler(async (req, res, next) => {
    try {
        let token = null;
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer')) token = auth.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Not authorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

export default protect;