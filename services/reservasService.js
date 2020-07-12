const reservationSche = require('../schemas/resSchema');
const queryService = require('../utilities/queryService');

const reservasService = {
    /**
     * creo las reservas con Id del pasajero, fecha, room ID y estado
     */
    create: async function(pasaId, date, roomId, estado){
        // comprobar que no existen otras reservas en date y room Idç
        /* utilizo search para comprobar si hay reservas en la fecha y habitacion que quiero usar
        1 - busco y obtengo las reservas que haya parq la misma fecha y habitacion
        2 - verifico si existe alguna
            2.1 - Si existe, ... tirar un error.
            2.2 - Si no existe, creo la reserva
        throw new Error("Mensaje de error");

        if(busqueda){}
        
            
        
        */
        //creo el objeto reservation con los parametros que me pasan
        const reservation = new reservationSche({
            pasaId: pasaId,
            date: date,
            roomId: roomId,
            estado: estado
        });
        //guardo el objeto en la base de datos
        await reservation.save();
        //devuelvo el objeto creado
        return reservation;
    },

    /**
     * Returns the reservation of the ID.
     */
    getById: async function(reservationId) {
        if(reservationId)
            return await reservationSche.findById(reservationId);
        else
            return null;
    },

    /**
     * get all the reservas with a limit of 100
     * @param {number} limit 
     */
    getAll: async function(limit = 100) {


        // Obtengo todas las reservas
        const filterQuery = reservationSche.find();
        return await queryService.queryLimiter(filterQuery, limit);

        // // Si hay un valor en limit, limito los resultados
        // if(limit && limit > 0)
        //     return await filterQuery.limit(limit);
        // else
        //     return await filterQuery;
    },

   


    /**
     * Searches reservation within a date range.
     * @param {String} dateFrom 
     * @param {String} dateTo 
     * @param {Number} limit 
     */
    searchByDateRange: async function(dateFrom, dateTo, limit=100) 
    {
        // Defino el objeto que va a ser el filtro
        let filter = {date : {}};

        // Completo el filtro con los valores.
        if(dateFrom)
            filter.date.$gte = dateFrom;

        if(dateTo)
            filter.date.$lte = dateTo;
        
        // Busco
        let filterQuery = reservationSche.find(filter);
        return await queryService.queryLimiter(filterQuery, limit);
        
        // Me fijo si me pasaron un valor en limit y limito la cant de registros
        /*if(limit && limit > 0)
            return await query.limit(limit);
        else
            return await query;*/
        
    },

    /**
     * Get all the reservations in a date range and by room ID
     * @param {String} dateFrom 
     * @param {String} dateTo 
     * @param {String} roomId 
     */
    serchByRoomNDate: async function(dateFrom, dateTo, roomId){

         // Defino el objeto que va a ser el filtro
         let filter = {date : {}};

         // Completo el filtro con los valores.
         if(dateFrom)
             filter.date.$gte = dateFrom;
 
         if(dateTo)
             filter.date.$lte = dateTo;

        if(roomId)
            filter.roomId = roomId 
         
         // Busco
         const retVal = await reservationSche.find(filter);

    }


};

module.exports = reservasService;