const services = require('./services');

const MAP_SERVICE_ENDPOINT = '35.228.20.102';

module.exports = {
    municipality: {
        async findByName(name) {
            return await services.fetch.get(
                MAP_SERVICE_ENDPOINT,
                'municipality',
                {name},
                null,
            )
        }
    }
}