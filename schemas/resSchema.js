const mongoose = require('mongoose')

//schema for reservations
const resSchema = mongoose.schema({
    nombre: String,
    apellido: String,
    pasaporte: Number,
    date: date.now,
    habitacion: Number
    
});