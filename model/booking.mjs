import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // for email format
      },
    location: {
        type: String,
        required: true
    },
    enentDate: {
        type: Date,
        default: Date.now
    },
    eventTime: {
        type: String,
        required: true
    },

   //dropdown list
    photographerSelection: {
        type: Array,
        required: true
      }
});

const Booking = mongoose.model('Booking', BookingSchema);


export default Booking;
