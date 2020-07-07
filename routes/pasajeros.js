const express= require('express');
const router = express.Router();
const pasajSchem = require('../schemas/pasSchema');



//registro al pasajero con Nombre-Apellido-Nro de Pasaporte
router.post('/', async (req, res) => {
    const pasaj = new pasajSchem({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        pasaporte: req.body.pasaporte    
    });
    try{
        const nPasaj = await pasaj.save()
        res.json(nPasaj);
        
    }catch(err){
        res.json({err});
        console.err(err)
    }
});
// get todos pasajeros
router.get('/', async (req, res) => {
    try{
        const allPasa = await pasajSchem.find();
        res.json(allPasa);
        console.log(allPasa)
    }catch(err){
        res.json(err);
        console.log(err);
    }
});

//get pasajero especifico por ID
   
router.get('/:pasaId', async (req, res) => {
    try{
        const pasaId = await pasajSchem.findById(req.params.pasaId);
        res.json(pasaId);
    }catch(err){
            res.json(err)
        }
});

// verifico si el ID del pasajero existe o mostrar err

router.get('/:pasaId', async (req, res) => {
    const pasaId = req.params.pasaId;
    if(pasaId===true) 
        console.log("Pasanger ID found");
    else{
        console.log('Pasanger ID not found.');
    }
    
});




module.exports = router;