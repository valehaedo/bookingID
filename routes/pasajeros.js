const express= require('express');
const router = express.Router();
const pasajerosSchem = require('../routes/pasajeros');
const { restart } = require('nodemon');


//registro al pasajero con Nombre-Apellido-Nro de Pasaporte
router.post('/', async (req, res) => {
    const pasaj = new pasajerosSchem({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        pasaporte: req.body.pasaporte    
    });
    try{
        const savedReserv = await pasaj.save()
        restart.json(savedReserv);
        
    }catch(err){
        res.json({err})
    }
});
    

module.exports = router;