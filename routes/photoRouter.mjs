import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary.mjs';
import Photo from '../model/photo.mjs';

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, temp) => {
        temp(null, './uploads'); // temporary storage folder server side
    },
    filename : (req, file, temp) => {
        // set a unique filename for uploaded file
        temp(null, Date.now() + file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage : storage});

//Upload Photo
router.post('/', upload.single("photoGallery"), async (req, res) => {
   try {
        const { path: filePath } = req.file;
        // Upload the file to Cloudinary using the file path
        cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'auto', // Auto-detect file type
        folder: 'photo-gallery', // Optional: store images in 'photo-gallery' folder
      }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
        }
  
        // Create a new photo document with the Cloudinary image URI
        const newPhoto = new Photo({
          photoURI: result.secure_url,  // Store the Cloudinary URL of the uploaded image
        });
  
        // Save the photo details to MongoDB
        await newPhoto.save();
  
        // Send the response back to the client
        res.status(201).json({
          message: 'Photo uploaded successfully',
          photo: newPhoto,
        });
      });

    
   } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
   }
});

// Get
router.get('/', async (req, res) => {
    try {
      console.log("Retrieving photos from the database...");
      // Fetch all photos from MongoDB
      let allPhotos = await Photo.find();  // Photo is the model where the photos are stored
      
      if (allPhotos.length === 0) {
        return res.status(404).json({ msg: 'No photos found' });
      }
      
      res.json(allPhotos);
    } catch (err) {
      console.error("Error retrieving photos:", err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });


export default router;