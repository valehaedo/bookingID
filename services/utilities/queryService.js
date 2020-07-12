// CREAR MODULO
const queryService = {

    /**
     * Limita la cantidad de registros que devuelve un query.
     * @param {Object} query 
     * @param {Number} limit 
     */
     
    queryLimiter: async function (query, limit) {
        const limitNum = parseInt(limit);

        if (!query)
            throw Error("Query cannot be null");

        // Si hay un valor en limit, limito los resultados
        if (limitNum && limitNum > 0)
            return await query.limit(limitNum);
        else
            return await query;
    },
}

module.exports = queryService;