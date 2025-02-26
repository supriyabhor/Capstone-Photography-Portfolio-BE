import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    publicId: {
        type: String,
        required:true,
    },
    photoURL: {
        type: String,
        required: true
    }
}, { timestamps : true});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;