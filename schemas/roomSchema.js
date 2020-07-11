const mongoose = require('mongoose');

//schema for pasajeros
const roomSchema = mongoose.Schema({
    number: String,
    bed: Number,
    extraBed: Number,
    people: Number
    
});

module.exports = mongoose.model('rooms', roomSchema);