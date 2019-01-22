const Question = require('./Question');
const GroupQuestions = require('./Questions/GroupQuestions');
const ConnectionQuestions = require('./Questions/ConnectionQuestions');
const MunicipalityQuestions = require('./Questions/MunicipalityQuestions');

const readline = require('readline');

let currentQuestion = null;

const mainQuestion = new Question(
    'Hva har du lyst til å gjøre?\n1. Lage gruppe,\n2. Legge til bruker til gruppe\n3. Legg til kommune til gruppe\n4. Avslutt.\nSkriv inn nummeret!\n',
    async (answer, data, q) => {
        const number = Number(answer.trim());
        switch(number) {
            case 1: {
                q.nextQuestion = GroupQuestions;
                return;
            }

            case 2: {
                q.nextQuestion = ConnectionQuestions;
                return;
            }

            case 3: {
                q.nextQuestion = MunicipalityQuestions;
                return;
            }

            case 4: {
                return;
            }
        }
    }
);

const start = async () => {
    currentQuestion = mainQuestion;

    currentQuestion.ask();
}

start();

