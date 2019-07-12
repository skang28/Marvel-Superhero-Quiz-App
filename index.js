const STORE = [
    {
        question: 'Which superhero started out as a carnival act, "The World\'s Greatest Marksman."',
        answers: [
            'Black Widow', 'Spiderman', 'Captain America', 'Hawkeye'
        ],
        correctAnswer: 'Hawkeye',
        picture: 'https://img2.looper.com/img/gallery/what-marvel-wants-you-to-forget-about-hawkeye/he-spent-most-of-his-career-in-a-swashbuckling-purple-costume-1522778657.jpg',
        alt: 'Hawkeye pic'
    },
    {
        question: 'Which superhero has a skeletal system fused with adamantium and super healing?',
        answers: ['Thor', 'Hulk', 'Wolverine', 'Batman'],
        correctAnswer: 'Wolverine',
        picture: 'http://www.90scomics.com/uploads/2/0/7/8/20783050/wolverine5_orig.jpg',
        alt: 'Wolverine pic'
    },
    {
        question: 'Which superhero is the king of his country, Wakanda?',
        answers: ['Iron Man', 'Spiderman', 'Black Panther', 'Magneto'],
        correctAnswer: 'Black Panther',
        picture: 'https://fsa.zobj.net/crop.php?r=uKdEEkpKt6mImSGqNR0--cuCyIJTYYFrpkiAmZCXAjNAkbg1z26n5FV30EGeaTU36tqIinvqNtp0r3TjVntRhwYpb43iaRxutTbSQQYQJMqz9KNFT-7MgsiAdgg5CrTnD0bfbjfKUrPSpOoI',
        alt: 'Black Panther pic'
    },
    {
        question: 'In the Xmen series, who created and ran the school for mutants?',
        answers: ['Wolverine', 'Superman', 'Professor Charles Xavier', 'Tony Stark'],
        correctAnswer: 'Professor Charles Xavier',
        picture: 'https://vignette.wikia.nocookie.net/xmenevo/images/a/ad/Charles_Xavier_-_Comics.png/revision/latest?cb=20151129003140',
        alt: 'Professor X pic'
    },
    {
        question: 'Which member of the Fantastic Four doesn\'t have a human form?',
        answers: ['Human Torch', 'Sue Storm', 'The Thing', 'Mr. Fantastic'],
        correctAnswer: 'The Thing',
        picture: 'https://img.cinemablend.com/cb/c/d/9/e/2/c/cd9e2c29946db45b575e01b6eb4fef5ae5b47ed12d60334205872d166edf8162.jpg',
        alt: 'The Thing pic'
    }
];

let score = 0;
let questionNumber = 0;

function renderLandingPage() {
//Begins the quiz after user clicks the 'Start Quiz' button
    $('main').html(`
        <h1>Can you name all the Marvel Superheroes?</h1>
        <div class="startQuiz">
            <button class="startButton" type="button">Start Quiz</button>
        </div>`);
    $('.startButton').click(function(event) {
        renderQuestions();
        $('.questionNumber').text(1);
    });
}

function renderQuestions() {
    $('main').html(generateQuestion());
}

function generateQuestion() {
//Displays each question & choices after user clicks'Start Quiz' or 'Next Question' button
    if (questionNumber < STORE.length) {
        return `
        <div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
            <fieldset>
                <label class="answerChoices">
                <input name="inputAnswer" type="radio" value="${STORE[questionNumber].answers[0]}" required>
                <span>${STORE[questionNumber].answers[0]}</span>
                </label>
                <label class="answerChoices">
                <input name="inputAnswer" type="radio" value="${STORE[questionNumber].answers[1]}" required>
                <span>${STORE[questionNumber].answers[1]}</span>
                </label>
                <label class="answerChoices">
                <input name="inputAnswer" type="radio" value="${STORE[questionNumber].answers[2]}" required>
                <span>${STORE[questionNumber].answers[2]}</span>
                </label>
                <label class="answerChoices">
                <input name="inputAnswer" type="radio" value="${STORE[questionNumber].answers[3]}" required>
                <span>${STORE[questionNumber].answers[3]}</span>
                </label>
                <button type="submit" id="submitButton">Submit</button>
            </fieldset>
        </form>
        </div>`
    }
    else {
        finalResults();
        restartQuiz();
        $('.questionNumber').text(5);
    }
}

function changeQuestionNumber() {
//Changes the question number at the top/header
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
}

function changeScore() {
//Updates the score after each question is answered correctly
    score ++;
    $('.score').text(score);
}

function selectAnswer() {
//Checks if the user selected wrong/correct answer and displays answer screen after submitting answer
    $('form').submit(function(event) {
        event.preventDefault();
        let selection = $('input[name="inputAnswer"]:checked').val();
        let checkAnswer = STORE[questionNumber].correctAnswer;
        if (selection === checkAnswer) {
            rightAnswer();
        }
        else {
            wrongAnswer();
        }
    });
}

function wrongAnswer() {
//Displays the wrong answer screen then gives option for next question
    let checkAnswer = STORE[questionNumber].correctAnswer;
    $('main').html(`
        <div class="wrongAnswerResponse">
            <p>Incorrect!<br>The correct answer is <span>${checkAnswer}</span></p>
            <button type=button class="nextQuestionButton">Next Question</button>
        </div>`);
    
    $('.nextQuestionButton').click(function(event) {
        changeQuestionNumber();
        renderQuestions();
    });
}

function rightAnswer() {
//Displays right answer screen with picture of superhero and button for next question
    let checkAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('main').html(`
        <div class="rightAnswerResponse">
            <p>Correct!</p>
            <img src="${STORE[questionNumber].picture}" alt="${STORE[questionNumber].alt}">
            <button type=button class="nextQuestionButton">Next Question</button>
        </div>`);
   $('.nextQuestionButton').click(function(event) {
       changeQuestionNumber();
       changeScore();
       renderQuestions();
   });

}

function finalResults() {
//After quiz is over, displays info on how many right/wrong, percentage grade, and some message
    $('main').html(`
        <div class="results">
            <p>Congratulations! You've completed the quiz!</p>
            <br><p>You got ${score} / 5 correct!
            <button class="restartButton">Restart Quiz</button>`)
}

function restartQuiz() {
//After user has finished quiz, allows the user to restart the quiz from the beginning
    $('.restartButton').click(function(event) {
        renderLandingPage();
    });
}

$(renderLandingPage);