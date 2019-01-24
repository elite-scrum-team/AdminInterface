const userService = require('../userServiceDB/models');

const USER_SERVICE_ENDPOINT = '35.228.19.181';

module.exports = {
    group: {
        async create(name) {
            console.log("Creating");
            return await userService.group.create({name});
        },
        async retrieve() {
            return await userService.group.findAll().then(d => d.map((it) => it.dataValues));
        },

        async add(groupId, userId) {
            return await userService.user_group.create({groupId, userId});
        },
        async addMunicipality(groupId, municipality) {
            return await (await userService.group.findByPk(groupId)).update({municipalitiy: municipality});
        }
    },
    user: {
        async retrieveByEmail(email) {
            return await userService.user.findOne({where: {email}}).then((u) => u.dataValues);
        },
    }
}