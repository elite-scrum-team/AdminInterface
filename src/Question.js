const readline = require('readline');

const Question = function (question, handleAnswer, nextQuestion = null) {
    this.question = question;
    this.handleAnswer = handleAnswer;
    this.nextQuestion = nextQuestion;
}

Question.prototype.ask = async function(prevData){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\n'.concat(this.question), async (answer) => {
       
        rl.close();
        const data = await this.handleAnswer(answer, prevData, this);
        if(this.nextQuestion) {
            this.nextQuestion.ask(data);
        }
    });
}

module.exports = Question;