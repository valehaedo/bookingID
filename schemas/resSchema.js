const mongoose = require('mongoose')

//schema for reservations
const resSchema = mongoose.Schema({
    pasaId: String,
    date: Date,
    roomId: String,
    estado: Boolean
    
});

module.exports = mongoose.model('reservation', resSchema, 'reservations');