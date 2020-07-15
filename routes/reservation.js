//requiero los paquetes y modulos necesarios
const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservasService');



//creo las reservas con ID de pasajero-fecha-Nro de habitacion
router.post('/', async (req, res) => {



    try {
        const reservation = await reservationService.create
            (req.body.pasaID, req.body.date, req.body.roomId, req.body.estado)
        return res.json(reservation)
    } catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
});

/**
 * GET http://lolcalhost.com/reservation/search?dateFrom=2020-07-06&dateTo=2020-08-06
 */
router.get('/search', async (req, res) => {
    try {

        // Obtengo el valor de limit
        const limit = parseInt(req.query.limit);

        let reservations;
        // Llamo la funcion de una manera u otra dependiendo de si limit tiene valor
        if (limit)
            reservations = await reservationService.search(req.query.dateFrom, req.query.dateTo, req.query.roomId, limit);
        else
            reservations = await reservationService.search(req.query.dateFrom, req.query.dateTo, req.query.roomId);
        
        return res.json(reservations);
    } catch (err) {
        console.error(err)
        return res.status(500).json(err.message || err);
    }
});

/**
 * Actualiza una reserva.
 * Los valores posibles son date, habitacion y estado.
 */
router.post('/:reservationId', async (req, res) => {
    const fullReserv = await reservationService.getById(req.params.reservationId);

    if (!fullReserv)
        return res.status(404).send();

    const date = req.body.date;
    const habitacion = req.body.habitacion;
    const estado = req.body.estado;

    if (date) {
        fullReserv.date = date
    }

    if (habitacion) {
        fullReserv.habitacion = habitacion
    }

    if (estado) {
        fullReserv.estado = estado
    }
    fullReserv.save();
    res.json(fullReserv);

});

/**
 * Returns all reservations.
 * Limited to 100 max result.
 */
router.get('/', async (req, res) => {
    try {
        // Defino el maximo permitido.
        const maxAllowed = 100;

        // Obtengo el limite
        let limit = req.query.limit;

        // Si el limite es mas alto que lo permitido, lo reemplazo.
        if (limit > maxAllowed)
            limit = maxAllowed;

        // Obtengo los datos
        retVal = await reservationService.getAll(limit);

        return res.json(retVal);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

//obtengo reserva por ID 
router.get('/:reservationId', async (req, res) => {

    const fullReserv = await reservationService.getById(req.params.reservationId);
    if (fullReserv)
        res.json(fullReserv);
    else
        res.json('Reservation or pasanger not found.');
});


//get reservations by date and room ID

module.exports = router;