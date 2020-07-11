const router = require('express').Router();
const roomService = require('../schemas/roomService');

//create the room

router.post('/', async (req, res) => {
    try {
        //creat and get a room      
        const newRoom =
            roomService.create(req.body.number, req.body.bed, req.body.extraBed, req.body.people, req.body.breakfast);
        //return the created room
        return res.json(newRoom)
    } catch (err) {
        return res.status(500).json(err)
    }
});


//get all the rooms
router.get('/', async (req, res) => {
    try {
        const allRooms = await roomService.getAll();
        return res.json(allRooms);
    } catch (err) {
        return res.status(500).json(err);
    };
    
});
//get room by ID
router.get('/:roomId', async (req, res) => {
    try {
        // Obtengo el pasdajero por id
        const roomId = roomService.getById(req.params.roomId);
        
        return res.json(roomId);
    } catch (err) {
        return res.status(500).json(err)
    }
});

//delete the room by ID
router.delete('/', async (req, res) => {
    try{
        roomService.deleteById();
    }catch(err){
        return res.status(500).json(err)
    }
});

module.exports = router;