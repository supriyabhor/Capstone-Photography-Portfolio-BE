//Import
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

//setup
const app= express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//DataBase Connection
connectDB();

//Message display in Browser
app.get("/", (req, res) => {
    res.send("Welcome .... Server is Running");
})


//Middleware


//Routes

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT:  ${PORT}`);
})