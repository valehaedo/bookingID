const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');
require ('dotenv/config');

//middlewars

app.use(cors());
app.use(bodyParser.json());

//ruta

const reservRouter = require('./routes/reservation');
const pasaRouter = require('./routes/pasajeros');

app.use('/pasajeros', pasaRouter);
app.use('/reservation', reservRouter);

app.get('/', (req, res) => {
    res.send('estamos conectados');
})


//indico el puerto en el que escucho

app.listen(process.env.PORT);
//me conecto con mongoDB
mongoose.connect(
    process.env.DB,{
        useUnifiedTopology: true,
        useNewUrlParser: true    
    }, (err) => {
        // TODO manejar si hay errores
        if(err){
            console.log(err)
        }else{
        // TODO mostrar mensaje de que se conecto
            console.log('We are connected')
        }
        
    }
);



