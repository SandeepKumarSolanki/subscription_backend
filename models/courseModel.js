import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number, default: 0 },
    image: String
});

const courseModel = mongoose.model('Course', courseSchema)

export default courseModel;