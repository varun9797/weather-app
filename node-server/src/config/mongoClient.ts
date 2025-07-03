import mongoose from 'mongoose';


const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weather';

mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected...'))
.catch((err: any) => console.error('MongoDB connection error:', err));
