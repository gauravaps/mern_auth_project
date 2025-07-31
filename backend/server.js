import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';





// dotenv config
dotenv.config();
  
// express app
const app = express(); 
 
// middlewares
app.use(cors());
app.use(express.json());

// set auth routes here .....
app.use('/api', authRoutes);

// all type of user's route
app.use('/api', userRoutes);


// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});





// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected..');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));