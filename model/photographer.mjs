import mongoose from "mongoose";

const PhotographerSchema = new mongoose.schema({
    name: {
       type: String,
       required:true
    },
    email:{
        type: String,
        required: true,
        unique: true, // Ensure no duplicate emails
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    phone: {
        type: String,
        required: false,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
    },
    bio: {
        type: String,
        required: true
    },
    portfolioURL:{
        type: String,
        required: true
    }   

});

const Photgrapher = mongoose.model('Photographer', PhotographerSchema);

export default Photgrapher;