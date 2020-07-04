//requiero los paquetes y modulos necesarios
const express = require('express');
const router = express.Router();
const reservationSche = require ('../schemas/resSchema');


//registro al pasajero con Nombre-Apellido-Nro de Pasaporte
router.post('/', async (req, res) => {
    const reservation = new reservation({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        pasaporte: req.Number.pasaporte    
    });
    try{
        const savedReserv = await reservation.save()
        console.log(savedReserv);
    }catch(err){
        console.log(err)
    }
});
/*
//creo las reservas con ID de pasajero-fecha-Nro de habitacion
    date: date.now,
    habitacion: req.number.habitacion

// verifico si el ID del pasajero existe o mostrar err


//modifico reserva (solo habitacion/fecha)

//elimino reservas

//obtengo reserva por ID o nombre o apellido 
reservation.get('/:reservationsId', async (req, res) =>{
    if(_id||nombre||apellido){
        const fullReserv = await reservations.findById(req.params.reservationsId)
        console.log(fullReserv)
    }else{
        console.log('Reservation or pasanger not found.')
    }
})
*/
module.exports = router;