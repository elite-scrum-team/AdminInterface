const Question = require('../Question.js');
const WarningService = require('../services/WarningService.js');

const createCateogryQuestion = new Question(
    'Hva er navnet på den nye kategorien?`\nNavn: ',
    async (answer, prevData, q) => {
        const categoryName = answer.trim();
        
        console.log('Creating new category...');
        const r = await WarningService.category.create(categoryName);
        console.log('Status: ', r.status);

        if(r.status >= 400) {
            console.log('RIP! Klarte ikke å opprette kategorien!');
            q.nextQuestion = q;
        } else {
            console.log('Done!');
        }
    }
);

const deleteCategoryQuestion = new Question(
    'Vis alle kategorier\n',
    async (answer, prevData, q) => {
        
        const r = await WarningService.category.retrieve();
        if(r.status >= 400) {
            console.log('RIP! Kunne ikke hente noen kategorier');
            q.nextQuestion = null;
            return;
        }

        const categories = await r.json();
        categories.forEach((c, i) => {
            console.log(i + ': ' + c.name);
        });
        return categories;
    }
)

const chooseCategoryQuestion = new Question(
    'Velg en kategori å slette med å oppgi en index\n',
    async (answer, prevData, q) => {
        const index = Number(answer.trim());
        const category = prevData[index];

        if(!category) {
            console.log('Kan ikke velge en kategori med den indeksen!');
            q.nextQuestion = q;
            return;
        }

        console.log(`Sletter kategori ${category.name}...`);
        const categoryId = category.id;
        const r = await WarningService.category.delete(categoryId);
        console.log('Status: ', r.status);
        console.log('Done!');
    }
);

const firstQuestion = new Question(
    'Hva har du lyst til å gjøre?\n1. Legg til ny kategori.\n2. Slette en eksisterende kategori.\n',
    async (answer, prevData, q) => {
        const index = Number(answer.trim());

        if(index === 1) {
            q.nextQuestion = createCateogryQuestion;
        } else if(index === 2) {
            q.nextQuestion = deleteCategoryQuestion;
        } else {
            console.log('Feil valg!');
            q.nextQuestion = q;
        }
    }
);

deleteCategoryQuestion.nextQuestion = chooseCategoryQuestion;

module.exports = firstQuestion;