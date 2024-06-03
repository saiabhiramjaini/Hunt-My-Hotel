import express from 'express';
import cors from 'cors';
require("dotenv").config();

import connectDB from './db/connect';
import hotelRoutes from './routes/hotelsRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', hotelRoutes);

connectDB;

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})