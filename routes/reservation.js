//requiero los paquetes y modulos necesarios
const express = require('express');
const router = express.Router();
const reservationSche = require('../schemas/resSchema');


//creo las reservas con ID de pasajero-fecha-Nro de habitacion
router.post('/', async (req, res) => {
    const reserv = new reservationSche({
        pasaId: req.body.pasaId,
        date: req.body.date,
        habitacion: req.body.habitacion
    });
    try {
        const nReserv = await reserv.save()
        res.json(nReserv);

    } catch (err) {
        res.json({ err });
        console.log(err)
    }
});






//modifico reserva (solo habitacion/fecha)
router.post('/:reservationId', async (req, res) => {
    const fullReserv = await reservationSche.findById(reservationsId);
    const date = req.body.date
    if(date){

    }
    /*const updateReser = await reservationSche.updateOne(
        { _id: req.params.reservationId },
            {
            $set: {
                date: req.body.date,
                habitacion: req.body.habitacion,
                estado: req.body.estado
            }
        });
        
        res.json(updateReser);*/
});

//elimino reservas


//obtengo reserva por ID 
router.get('/:reservationsId', async (req, res) => {
    const reservationsId = req.params.reservationsId;
    if (reservationsId) {
        const fullReserv = await reservationSche.findById(reservationsId);
        console.log(fullReserv);
    } else {
        console.log('Reservation or pasanger not found.');
    }
})

module.exports = router;