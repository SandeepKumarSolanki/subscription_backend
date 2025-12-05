import express from 'express'
import asyncHandler from 'express-async-handler';
import protect from '../middlewares/authMiddleware.js';
import courseModel from '../models/courseModel.js';
import subscriptionModel from '../models/subscriptionModel.js';

const subscribeRouter = express.Router();


subscribeRouter.post('/', protect, asyncHandler(async (req, res) => {
    try {
        const { courseId, promoCode } = req.body;
        const course = await courseModel.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
    
    
        let priceToPay = course.price || 0;
        if (priceToPay > 0) {
            if (!promoCode) return res.status(400).json({ message: 'Promo code required for paid course' });
            if (promoCode !== 'BFSALE25') return res.status(400).json({ message: 'Invalid promo code' });
            priceToPay = priceToPay * 0.5; 
        }
    
    
        const existing = await subscriptionModel.findOne({ userId: req.user._id, courseId });
        if (existing) return res.status(400).json({ message: 'Already subscribed' });
    
    
        const sub = await subscriptionModel.create({ userId: req.user._id, courseId, pricePaid: priceToPay });
        res.status(200).json({ message: 'Subscribed', subscription: sub });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }
}));



subscribeRouter.get('/my-courses', protect, asyncHandler(async (req, res) => {
    try {
        const subs = await subscriptionModel.find({ userId: req.user._id }).populate('courseId');
        res.status(200).json(subs.map(s => ({
            id: s._id,
            title: s.courseId.title,
            pricePaid: s.pricePaid,
            subscribedAt: s.subscribedAt,
            image: s.courseId.image
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }
}));


export default subscribeRouter;