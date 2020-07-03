const express = require ('express');
const app = express();
const mongoose = require('mongoose');
require ('dotenv/config');

//ruta

app.get('/', (req, res) => {
    console.log('estamos conectados');
})

//indico el puerto en el que escucho

app.listen(process.env.PORT);
//me conecto con mongoDB
mongoose.connect(
    process.env.DB,{
        useUnifiedTopology: true   
    }, () => {
        // TODO manejar si hay errores
        // TODO mostrar mensaje de que se conecto
    }
);

//obtengo reserva por ID o nombre o apellido 

