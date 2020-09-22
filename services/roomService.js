const roomSchema = require('../schemas/roomSchema');
const queryService = require('./utilities/queryService');

const roomService = {
    /**
     * create a room taking number, bed, extraBed, people
     */
    create: async function (number, bed, extraBed, people) {

        // Creo el objeto room con los valores que recibo como parametros
        const room = new roomSchema({
            number: number,
            bed: bed,
            extraBed: extraBed,
            people: people
        });
        // Lo guardo en la base
        await room.save();

        // Devuelvo el objeto creado
        return room;

    },
    
    /**
     * Get all the rooms or the one i choose with the number of the room
     * @param {string} number 
     */
    getAll: async function (number) {
        if (number)
            return await roomSchema.find({ number: number });
        else
            return await roomSchema.find();
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
    deleteByNumber: async function (number) {
        if (number)
            return await roomSchema.deleteOne({ number: number });
        else
            return null;
    },


};




module.exports = roomService;