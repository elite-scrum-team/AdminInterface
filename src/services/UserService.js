const services = require('./services');

const USER_SERVICE_ENDPOINT = '35.228.19.181';

module.exports = {
    group: {
        async create(name) {
            console.log("Creating");
            return await services.fetch.post(
                USER_SERVICE_ENDPOINT,
                'group',
                {},
                {name},
                null,
            )
        },
        async retrieve() {
            return await services.fetch.get(
                USER_SERVICE_ENDPOINT,
                'group',
                {},
                null,
            );
        },

        async add(groupId, userId) {
            return await services.fetch.post(
                USER_SERVICE_ENDPOINT,
                'group/add',
                {},
                {groupId, userId},
                null,
            );
        },
        async addMunicipality(groupId, municipalityId) {
            return await services.fetch.put(
                USER_SERVICE_ENDPOINT,
                `group/${groupId}`,
                {},
                {municipalitiy: municipalityId},
                null,
            )
        }
    },
    user: {
        async retrieveByEmail(email) {
            return await services.fetch.get(
                USER_SERVICE_ENDPOINT,
                'user/data',
                {email},
                null,
            );
        },
    }
}