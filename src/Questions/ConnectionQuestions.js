const Question = require('../Question.js');
const UserService = require('../services/UserService.js');

const firstQuestion = new Question(
    'Vis grupper',
    async (answer, prevData) => {
        const groups = await UserService.group.retrieve(answer);
        groups.forEach((g, i) => {
            console.log(i + ': ' + g.name + ' - ' + g.id);
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

const connectWithUserIdQuestion = new Question(
    'Skriv inn en userId\n',
    async (answer, prevData) => {
        const userId = answer.trim();
        console.log("Legger til bruker til gruppe: ", prevData);
        const instance = await UserService.group.add(prevData, userId);
        console.log("Done!");
    }
);

const connectWithEmailQuestion = new Question(
    'Skriv inn en email:\n',
    async (answer, prevData, q) => {
        const email = answer.trim();

        console.log('Henter brukerdata...');
        const userData = await UserService.user.retrieveByEmail(email);
        console.log('Status: ', userData);

        if(!userData) {
            console.log('Kunne ikke finne en bruker med denne iden');
            q.nextQuestion = q;
            return prevData;
        }

        console.log('Legger til bruker til gruppe: ', prevData);
        const instance = await UserService.group.add(prevData, userData.id);
        console.log('Done!');
    }
)


const thirdQuestion = new Question(
    'Velg hvilken måte du vil velge en bruker på.\n1. Oppgi userId.\n2. Oppgi email\n',
    async (answer, prevData, q) => {
        const index = Number(answer.trim());
        if(index === 1) {
            q.nextQuestion = connectWithUserIdQuestion;
        } else if (index === 2) {
            q.nextQuestion = connectWithEmailQuestion;
        } else {
            console.log('Du må velge enten 1 eller 2');
            q.nextQuestion = q;
        }
        return prevData;
    }
)



firstQuestion.nextQuestion = secondQuestion;
secondQuestion.nextQuestion = thirdQuestion;

module.exports = firstQuestion;