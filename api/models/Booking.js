const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema  ({
    place :{type:mongoose.Schema.Types.ObjectId , required:true},
    checkinDate : { type: Date , required: true },
    checkoutDate : { type: Date , required: true },
    name : { type: String , required: true},
    phone : {type:String ,required:true},
    price : Number,
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = { bookingModel };