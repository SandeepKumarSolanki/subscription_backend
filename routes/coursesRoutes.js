import express from 'express';
import courseModel from '../models/courseModel.js';
import asyncHandler from 'express-async-handler';

const courseRouter = express.Router();


courseRouter.get('/', asyncHandler(async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json({courses});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message});
    }
}));



courseRouter.get('/:id', asyncHandler(async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }
}));


export default courseRouter;