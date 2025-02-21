//Import
import express from 'express';
import dotenv from 'dotenv';

//setup
const app= express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome .... Server is Running");
})


//Middleware


//Routes

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT:  ${PORT}`);
})