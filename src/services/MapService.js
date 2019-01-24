const mapService = require('../mapServiceDB/models');


const MAP_SERVICE_ENDPOINT = '35.228.20.102';

module.exports = {
    municipality: {
        async findByName(name) {
            return await mapService.municipality.findOne({where: {name}}).then(m => m.dataValues);
        }
    }
}