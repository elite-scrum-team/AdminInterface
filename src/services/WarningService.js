const db = require('../warningServiceDB/models');

const WARNING_SERVICE_ENDPOINT = '35.228.119.12';

module.exports = {
    category: {
        async create(name) {
            return await db.category.create({name});
        },

        async retrieve() {
            return await db.category.findAll().then(d => d.map((it) => it.dataValues));
        },

        async delete(categoryId) {
            return await db.category.destroy({
                where: {
                    id: categoryId,
                }
            })
        }
    },
}