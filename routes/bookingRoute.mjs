import express from 'express';
import booking from '../model/booking.mjs'


const router = express.Router();

// Create
router.post('/', async (req, res) =>{
    try {
          console.log("New Data created:", req.body);
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

// Read
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

// Update
router.put('/:id', async (req, res) =>{
  try {
    console.log("Data updated successfully.");
    let updateBooking = await booking.findByIdAndUpdate(
      req.params.id, 
      req.body,
       { new : true, runValidators: true }
    );
      
       res.json(updateBooking);
    
  } catch (err) {
   console.error(err);
   res.status(500).json({msg: 'Server Error'});
  }
})

// Delete
router.delete('/:id', async (req, res) =>{
  try {
    console.log("Data Deleted successfully.");
     await booking.findByIdAndDelete(req.params.id);
      
     res.json({ msg: 'booking Deleted Successfully' });
    
  } catch (err) {
   console.error(err);
   res.status(500).json({msg: 'Server Error'});
  }
})




export default router;