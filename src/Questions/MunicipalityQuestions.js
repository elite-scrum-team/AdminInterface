const Question = require('../Question.js');
const UserService = require('../services/UserService.js');
const MapService = require('../services/MapService');

const firstQuestion = new Question(
    '\nSkriv navnet på en kommune (NØYAKTIG!) ',
    async (answer) => {
        const municipalityName = answer.trim();
        const r = await MapService.municipality.findByName(municipalityName);
        console.log("STATUS: ", r.status);
        if(r.status !== 200) {
            console.log("RIP");
        }
        const municipalites = await r.json();
        return municipalites && municipalites.length > 0 ? municipalites[0] : null;
    }
);

const secondQuestion = new Question(
    '\nVis grupper du kan velge',
    async (answer, prevData) => {
        const r = await UserService.group.retrieve(answer);
        const groups = await r.json();
        groups.forEach((g, i) => {
            console.log(i + ': ' + JSON.stringify(g));
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
        const r = await UserService.group.addMunicipality(selectedGroup.id, prevData.municipality.id);
        console.log('Status: ', r.status);
        console.log('Done!');
    }
);

firstQuestion.nextQuestion = secondQuestion;
secondQuestion.nextQuestion = thirdQuestion;

module.exports = firstQuestion;