const Question = require('./Question');
const GroupQuestions = require('./Questions/GroupQuestions');
const ConnectionQuestions = require('./Questions/ConnectionQuestions');
const MunicipalityQuestions = require('./Questions/MunicipalityQuestions');
const CategoryQuestions = require('./Questions/CategoryQuestions');

const readline = require('readline');

const mainOptions = [
    'Lage gruppe',
    'Legge til bruker til gruppe',
    'Legge til kommune til gruppe',
    'Administrer kategorier',
];

const startQuestion = () => {
    let question = 'Hva har du lyst til å gjøre?';
    mainOptions.forEach((opt, i) => {
        question = question.concat('\n', i + 1, '. ', opt);
    });
    question = question.concat('\n',mainOptions.length + 1, '. ', 'Avslutt.');
    return question.concat('\nSkriv inn nummeret\n');
}

const mainQuestion = new Question(
    startQuestion(),
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
                q.nextQuestion = CategoryQuestions;
            }

            case 5: {
                return;
            }
        }
    }
);

Question.start(mainQuestion);

