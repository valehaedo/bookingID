const pasajSchem = require('../schemas/pasSchema');
const queryService = require('./utilities/queryService');

/**
 * Se encarga de la interaccion de los datos de pasajeros con la base de datos.
 */
const pasajeroService = {

    /**
     * Crea un pasajero tomando un nombre, apellido y pasaporte como parametros.
     */
    create: async function (nombre, apellido, pasaporte) {

        // Creo el objeto pasajero con los valores que recibo como parametros
        const pasaj = new pasajSchem({
            nombre: nombre,
            apellido: apellido,
            pasaporte: pasaporte
        });

        // Lo guardo en la base
        await pasaj.save();

        // Devuelvo el objeto creado
        return pasaj;
    },

    /**
     * Devuelve todos los pasajeros.
     * @param {number} limit Limite de registros a obtener. Si este valor es null, devuelve todo.
     */
    getAll: async function (name, lastName, pasport, limit = 100) {
        //defino objeto filtro
        let filter = {};
        //TODO: declarar el objeto filter, agregar los otros filtros, pasale los objetos
        if (name)
            filter.nombre = name;
        if (lastName)
            filter.apellido = lastName;
        if (pasport)
            filter.pasaporte = pasport;

        // Obtengo la consulta para obtener las reservas

        console.log(filter)
        let filterQuery = pasajSchem.find(filter);
        return await queryService.queryLimiter(filterQuery, limit);

        // Si hay un valor en limit, limito los resultados
        /* if (limit && limit > 0)
             return await query.limit(limit);
         else
             return await query;
             */
    },

    /**
     * Devuelve un pasajero segun su ID
     * @param {string} pasajeroId Id del pasajero que se desea obtener
     */
    getById: async function (pasajeroId) {
        if (pasajeroId)
            return await pasajSchem.findById(pasajeroId);
        else
            return null;

    },
};

module.exports = pasajeroService;