import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

//Loding environment variable
dotenv.config();

//configure cloudinary with credentials from .env file
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



export default cloudinary;