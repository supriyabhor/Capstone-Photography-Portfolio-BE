import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    photoURI: {
        type: String,
        required: true
    }
}, { timestamps : true});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;