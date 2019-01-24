const Question = require('../Question.js');
const UserService = require('../services/UserService.js');
const MapService = require('../services/MapService');

const firstQuestion = new Question(
    '\nSkriv navnet på en kommune (NØYAKTIG!) ',
    async (answer, prevData, q) => {
        const municipalityName = answer.trim();
        const municipality = await MapService.municipality.findByName(municipalityName);
        console.log("STATUS: ", municipality);

        if(!municipality) {
            console.log(`Fant ingen kommuner med navn: ${answer}`);
            q.nextQuestion = q;
        }

        return municipality;
    }
);

const secondQuestion = new Question(
    '\nVis grupper du kan velge',
    async (answer, prevData) => {
        const groups = await UserService.group.retrieve(answer);
        groups.forEach((g, i) => {
            console.log(i + ': ' + g.name + ' - ' + g.id);
        });
        return {groups, municipality: prevData};
    }
);

const thirdQuestion = new Question(
    '\nVelg gruppe med index\n',
    async (answer, prevData) => {
        
        const number = Number(answer.trim());
        const selectedGroup = prevData.groups[number];

        if(!selectedGroup) {
            console.log("Invalid group selected!");
            return null;
        }

        console.log("You selected: ", selectedGroup.name);
        
        console.log(`Connecting ${prevData.municipality.name} with ${selectedGroup.name}`)
        const instance = await UserService.group.addMunicipality(selectedGroup.id, prevData.municipality.id);
        console.log('Done!');
    }
);

firstQuestion.nextQuestion = secondQuestion;
secondQuestion.nextQuestion = thirdQuestion;

module.exports = firstQuestion;