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

router.get('/', async (req, res) => {
    try {
        const number = parseInt(req.query.number);
        const allRooms = await roomService.getAll(number);
        return res.json(allRooms);
    } catch (err) {
        return res.status(500).json(err.message || err);
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

//delete the room by room number
router.delete('/:number', async (req, res) => {
    try{
        const number = await roomService.deleteByNumber(req.params.number);
        return res.json(number)
    }catch(err){
        return res.status(500).json(err)
    }
});



module.exports = router;