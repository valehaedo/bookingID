const pasajSchem = require('../schemas/pasSchema');

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
    getAll: async function (limit = 100) {

        // Obtengo todas las reservas
        const retVal = await pasajSchem.find();

        // Si hay un valor en limit, limito los resultados
        if (limit && limit > 0)
            return retVal.limit(limit);
        else
            return retVal;
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