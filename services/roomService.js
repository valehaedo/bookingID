const roomSchema = require('../schemas/roomSchema');
const queryService = require('../utilities/queryService');

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
     * Get all the rooms with a limit of a 100 by default or number the quantity i choose
     * @param {number} limit 
     */
    getAll: async function (limit = 100) {

        // get all the rooms
        const query = roomSchema.find();
        let filterQuery = roomSchema.find(filter);
        return await queryService.queryLimiter(filterQuery, limit);

        // if there is a value in limit, i limit the results
        /*if (limit && limit > 0)
            return await query.limit(limit);
        else
            return query;
        */
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
        if (roomId)
            return await roomSchema.deleteOne({_id: roomId});
        else
            return null;
    },

    
};




module.exports = roomService;