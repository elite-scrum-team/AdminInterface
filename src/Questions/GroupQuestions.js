const Question = require('../Question.js');
const UserService = require('../services/UserService.js');

const firstQuestion = new Question(
    'Hva skal gruppen hete?`\nNavn: ',
    async (answer) => {
        console.log(`Creating group with name "${answer}"`);
        const r = await UserService.group.create(answer);
        console.log("Status: ", r.status);
        console.log('Done!');
    }
);

module.exports = firstQuestion;