//Import
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import bookingRoutes from './routes/bookingRoute.mjs';
import photographerRoutes from './routes/photographerRoute.mjs';
import photoRoute from './routes/photoRouter.mjs';
import cors from 'cors';

//setup
const app= express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//DataBase Connection
connectDB();

//Message display in Browser
// app.get("/", (req, res) => {
//     res.send("Welcome .... Server is Running");
// })


//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/booking', bookingRoutes);
app.use('/photographer', photographerRoutes);
app.use('/photo', photoRoute);

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT:  ${PORT}`);
})