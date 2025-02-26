import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary.mjs';
import Photo from '../model/photo.mjs';


 const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, temp) => {
    console.log('Setting temporary storage folder...');
    temp(null, './uploads'); // temporary storage folder server side
  },
  filename: (req, file, temp) => {
    console.log('Setting unique filename for uploaded file...');
    temp(null, Date.now() + file.originalname);
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Upload Photo
router.post('/', upload.single("photoGallery"), async (req, res) => {
  console.log('Uploading photo...');
  try {
    const { path: filePath } = req.file;
    console.log('File path:', filePath);
    // Upload the file to Cloudinary using the file path
    cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'auto', // Auto-detect file type
      folder: 'photo-gallery', // Optional: store images in 'photo-gallery' folder
    }, async (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }
      console.log('Cloudinary upload result:', result);
      // Create a new photo document with the Cloudinary image URI
      const newPhoto = new Photo({
        photoURL: result.secure_url, // Store the Cloudinary URL of the uploaded image
      });
      console.log('New photo document:', newPhoto);
      // Save the photo details to MongoDB
      await newPhoto.save();
      console.log('Photo saved to MongoDB...');
      // Send the response back to the client
      res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto, });
    });
  } catch (err) {
    console.error('Server error:', err);
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

  //DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      // Find the photo by ID and delete it
      const deletedPhoto = await Photo.findByIdAndDelete(id);
      if (!deletedPhoto) {
        return res.status(404).json({ msg: 'Photo not found' });
      }
      // Delete the photo from Cloudinary
      cloudinary.v2.uploader.destroy(deletedPhoto.public_id, (error, result) => {
        if (error) {
          console.error("Error deleting photo from Cloudinary:", error);
        }
      });
      res.json({ msg: 'Photo deleted successfully' });
    } catch (err) {
      console.error("Error deleting photo:", err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

export default router;