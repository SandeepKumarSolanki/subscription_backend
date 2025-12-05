import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    pricePaid: Number,
    subscribedAt: { type: Date, default: Date.now }
});

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema)

export default subscriptionModel;
