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
        await reserv.save()
        res.json(reserv)
    } catch (err) {
        res.json({ err });
        console.log(err)
    }
});






//modifico reserva (solo habitacion/fecha/estado)
router.post('/:reservationId', async (req, res) => {
    const fullReserv = await reservationSche.findById(req.params.reservationId);
    const date = req.body.date;
    const habitacion = req.body.habitacion;
    const estado = req.body.estado;

    if(date){
            fullReserv.date = date 
    }

    if(habitacion){
            fullReserv.habitacion = habitacion
    }

    if(estado){
        fullReserv.estado = estado
    }
    fullReserv.save();
    res.json(fullReserv);

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
//obtengo todas las reservas
router.get('/', async(req, res) => {
    try{
        const allReserv = await reservationSche.find();
        res.json(allReserv);
    }catch(err){
        res.json(err);
        console.log(err);
    }
});

//obtengo reserva por ID 
router.get('/:reservationId', async (req, res) => {
    const reservationId = req.params.reservationId;
    if (reservationId) {
        const fullReserv = await reservationSche.findById(reservationId);
        res.json(fullReserv);
    } else {
        res.json('Reservation or pasanger not found.');
    }
})

module.exports = router;