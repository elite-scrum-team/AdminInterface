const Question = require('../Question.js');
const UserService = require('../services/UserService.js');

const firstQuestion = new Question(
    'Vis grupper',
    async (answer, prevData) => {
        const r = await UserService.group.retrieve(answer);
        const groups = await r.json();
        groups.forEach((g, i) => {
            console.log(i + ': ' + JSON.stringify(g));
        });
        return groups;
    }
);

const secondQuestion = new Question(
    'Velg gruppe med index\n',
    async (answer, prevData) => {
        
        const number = Number(answer.trim());
        const selectedGroup = prevData[number];
        console.log("You selected: ", selectedGroup.name);
        return selectedGroup.id;
    }
);

const thirdQuestion = new Question(
    'Skriv inn en userId\n',
    async (answer, prevData) => {
        const userId = answer.trim();
        console.log("Legger til bruker til gruppe: ", prevData);
        const r = await UserService.group.add(prevData, userId);
        console.log("Status: ", r.status);
        console.log("Done!");
    }
);

firstQuestion.nextQuestion = secondQuestion;
secondQuestion.nextQuestion = thirdQuestion;

module.exports = firstQuestion;