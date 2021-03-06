//const express = require('express');
const router = require('express').Router();
const pasajeroService = require('../services/pasajeroService')

//registro al pasajero con Nombre-Apellido-Nro de Pasaporte, 
router.post('/', async (req, res) => {

    try {

        // Creo y obtengo el pasajero creado
        const newPasajero = await pasajeroService.create(req.body.nombre, req.body.apellido, req.body.pasaporte);

        // Devuelvo la response con el pasajero creado
        return res.json(newPasajero);
    } catch (err) {
        // Si hay un error, respondo con codigo 500 (Server Error)
        return res.status(500).json(err);
    }
});


// get todos pasajeros

/**
 * GET http://localhost.com/pasajero?limit=10
 */
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const allPasajeros = await pasajeroService.getAll(req.query.nombre, req.query.apellido, req.query.pasaporte, limit);
        return res.json(allPasajeros);

    } catch (err) {
        return res.status(500).json(err.message || err);
    }
});



/**
 * Endpoint para obtener un pasajero por id.
 * Se consume mediante ruta /pasajeros/ID_DE_PASAJERO
 */
router.get('/:pasajeroId', async (req, res) => {
    try {
        // Obtengo el pasdajero por id
        const pasaId = await pasajeroService.getById(req.params.pasajeroId);

        return res.json(pasaId);
    } catch (err) {
        return res.status(500).json(err)
    }
});







module.exports = router;