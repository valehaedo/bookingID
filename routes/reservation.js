//requiero los paquetes y modulos necesarios
const express = require('express');
const router = express.Router();
const reservationSche = require('../schemas/resSchema');
const reservationService = require('../services/reservasService');


//creo las reservas con ID de pasajero-fecha-Nro de habitacion
router.post('/', async (req, res) => {
    const reserv = new reservationSche({
        pasaId: req.body.pasaId,
        date: req.body.date,
        roomId: req.body.roomId,
        estado: true
    });
    try {
        await reserv.save()
        res.json(reserv)
    } catch (err) {
        res.json({ err });
        console.log(err)
    }
});

/**
 * GET http://lolcalhost.com/reservation/search?dateFrom=2020-07-06&dateTo=2020-08-06
 */
router.get('/search', async(req, res) => {
    
    // Obtengo el valor de limit
    const limit = req.query.limit; 
    
    let reservations;
    // Llamo la funcion de una manera u otra dependiendo de si limit tiene valor
    if(limit)
        reservations = reservationService.searchByDateRange(req.query.dateFrom, req.query.dateTo, limit);
    else
        reservations = reservationService.searchByDateRange(req.query.dateFrom, req.query.dateTo);
        
    return reservations;
});

/**
 * Actualiza una reserva.
 * Los valores posibles son date, habitacion y estado.
 */
router.post('/:reservationId', async (req, res) => {
    const fullReserv = await reservationService.getById(req.params.reservationId);
    
    if(!fullReserv)
        return res.status(404).send();

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

/**
 * Returns all reservations.
 * Limited to 100 max result.
 */
router.get('/', async(req, res) => {
    try{
        // Defino el maximo permitido.
        const maxAllowed = 100;

        // Obtengo el limite
        let limit = req.query.limit;
        
        // Si el limite es mas alto que lo permitido, lo reemplazo.
        if(limit > maxAllowed)
            limit = maxAllowed;

        // Obtengo los datos
        retVal = await reservationService.getAll(limit);

        return res.json(retVal);
    }catch(err){
        res.json(err);
        console.log(err);
    }
});

//obtengo reserva por ID 
router.get('/:reservationId', async (req, res) => {
    
        const fullReserv = await reservationService.getById(req.params.reservationId);
        if(fullReserv)
            res.json(fullReserv);
        else
            res.json('Reservation or pasanger not found.'); 
});

module.exports = router;