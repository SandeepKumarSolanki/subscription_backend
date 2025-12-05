import express from 'express'

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';

const userRouter = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

userRouter.post('/signup', asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'User exists' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashed });
        res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}));


userRouter.post('/login', asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}));


export default userRouter;