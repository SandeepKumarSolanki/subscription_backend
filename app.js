import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import courseRouter from './routes/coursesRoutes.js';
import subscribeRouter from './routes/subscribeRoutes.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/auth', userRouter);
app.use('/courses', courseRouter);
app.use('/subscribe', subscribeRouter);


app.get('/', (req, res) => res.send('BlackFriday Courses API'));


export default app;