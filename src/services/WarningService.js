const services = require('./services');

const WARNING_SERVICE_ENDPOINT = '35.228.119.12';

module.exports = {
    category: {
        async create(name) {
            return await services.fetch.post(
                WARNING_SERVICE_ENDPOINT,
                'category',
                {},
                {name},
                null,
            );
        },

        async retrieve() {
            return await services.fetch.get(
                WARNING_SERVICE_ENDPOINT,
                'category',
                {},
                null,
            );
        },

        async delete(categoryId) {
            return await services.fetch.delete(
                WARNING_SERVICE_ENDPOINT,
                `category/${categoryId}`,
                {},
                null,
            );
        }
    },
}