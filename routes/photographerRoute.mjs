import express from 'express';
import Photgrapher from '../model/photographer.mjs';

const router = express.Router();

// Create- 
router.post('/', async (req, res) => {
    try {
        console.log("New Data entry Added:", req.body);

          let newPhotographer = new Photgrapher(req.body);
          await newPhotographer.save();

          res.json(newPhotographer);
          
    } catch (err) {
        console.error(err);
        res.status(500).json({Msg: 'Server Error'});
    }
})

// Read
router.get('/', async (req,res) =>{
   
    try {
        console.log("Retrived all Data..");
         let allPhotographer = await Photgrapher.find();
         res.json(allPhotographer); 
        
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
})


// Update
router.put('/:id', async (req, res) => {
    try {
        console.log("Data updated Successfully..");

        let updatePhotographer = await Photgrapher.findByIdAndUpdate(
            req.params.id,                       // Find by the photographer ID from the DB
            req.body,                            // Fields to update
            { new : true }  // return the updated document and validate
        );
          res.json(updatePhotographer);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({Msg: 'Server Error' });
    }
})




export default router;