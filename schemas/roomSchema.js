const mongoose = require('mongoose');

//schema for pasajeros
const roomSchema = mongoose.Schema({
    number: String,
    bed: Numero,
    extraBed: Numero,
    people: Number,
    breakfast: String 
});

module.exports = mongoose.model('rooms', roomSchema);