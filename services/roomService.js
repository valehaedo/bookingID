const roomSchema = require('../schemas/roomSchema');



const roomService = {
    /**
     * create a room taking number, bed, extraBed, people, breakfast
     */
    create: async function (number, bed, extraBed, people, breakfast) {

        // Creo el objeto room con los valores que recibo como parametros
        const room = new roomSchema({
            number: number,
            bed: bed,
            extraBed: extraBed,
            people: people,
            breakfast: breakfast
        });
        // Lo guardo en la base
        await room.save();

        // Devuelvo el objeto creado
        return room;

    },
    /**
     * Get all the rooms with a limit of a 100 by default or number the quantity i choose
     * @param {number} limit 
     */
    getAll: async function (limit = 100) {

        // get all the rooms
        const retVal = await roomSchema.find();

        // if there is a value in limit, i limit the results
        if (limit && limit > 0)
            return retVal.limit(limit);
        else
            return retVal;
    },
    /**
     * I get the rooms serching it by ID
     * @param {String} roomId 
     */

    getById: async function (roomId) {
        if (roomId)
            return await roomSchema.findById(roomId);
        else
            return null;

    },
    deleteById: async function (roomId) {
        if(roomId)
            return await roomSchema.findById(roomId);
        else(err)
            return null;
            }


};

module.exports = roomService;