import express from 'express';
import booking from '../model/booking.mjs'


const router = express.Router();

// Create
router.post('/', async (req, res) =>{
    try {
          console.log("Received data:", req.body);
                     //- solution 1
          let newBooking = await booking.create(req.body); 
          
                       //- solution 2
          // let newBooking = new booking(req.body); 
          //  await newBooking.save();
        

           res.json(newBooking);

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
})

//Read
router.get('/', async (req, res) =>{
  try {
    console.log("Retrived data successfully.");
       let allBooking = await booking.find();
       res.json(allBooking);
   
  } catch (err) {
   console.error(err);
   res.status(500).json({msg: 'Server Error'});
  }
})



export default router;