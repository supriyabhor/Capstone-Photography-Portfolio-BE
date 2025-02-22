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

export default router;