const router = require('express').Router();
const roomService = require('../services/roomService');

//create the room

router.post('/', async (req, res) => {
    try {
        //creat and get a room      
        const newRoom =
            await roomService.create(req.body.number, req.body.bed, req.body.extraBed, req.body.people);
        //return the created room
        return res.json(newRoom)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


//get all the rooms

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
        retVal = await roomService.getAll(limit);

        return res.json(retVal);
    }catch(err){
        return res.json(err);
    }
});

//get room by ID
router.get('/:roomId', async (req, res) => {
    try {
        // Obtengo el pasdajero por id
        const roomId = await roomService.getById(req.params.roomId);
        
        return res.json(roomId);
    } catch (err) {
        return res.status(500).json(err)
    }
});

//delete the roo by ID
router.delete('/:roomId', async (req, res) => {
    try{
        const roomId = await roomService.deleteById(req.params.roomId);
        return res.json(roomId)
    }catch(err){
        return res.status(500).json(err)
    }
});

module.exports = router;