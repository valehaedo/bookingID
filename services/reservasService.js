const reservationSche = require('../schemas/resSchema');

const reservasService = {
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
     * Obtiene todas las reservas.
     */
    getAll: async function(limit = 100) {

        // Obtengo todas las reservas
        const retVal = await reservationSche.find();

        // Si hay un valor en limit, limito los resultados
        if(limit && limit > 0)
            return retVal.limit(limit);
        else
            return retVal;
    },

    /**
     * Searches reservation within a date range.
     */
    searchByDateRange: async function(dateFrom, dateTo, limit = 100) 
    {
        // Defino el objeto que va a ser el filtro
        let filter = {date : {}};

        // Completo el filtro con los valores.
        if(dateFrom)
            filter.date.$gte = dateFrom;

        if(dateTo)
            filter.date.$lte = dateTo;
        
        // Busco
        const retVal = await reservationSche.find(filter);

        // Me fijo si me pasaron un valor en limit y limito la cant de registros
        if(limit && limit > 0)
            return retVal.limit(limit);
        else
            return retVal;
    }

};

module.exports = reservasService;