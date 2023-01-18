const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which Portuguese team did Ronaldo play for before signing for Manchester United?',
       choice1: 'Porto',
       choice2: 'Benfica',
       choice3: 'Braga',
       choice4: 'Sporting' ,
       answer: 4,
    },
    {
        question: 'Messi famously retired from international duty in which year before reversing his decision?',
        choice1: '2016',
        choice2: '2014',
        choice3: '2018',
        choice4: '2010' ,
        answer: 1,
    },
    {
        question: 'Messi wore the No.30 at the start of his Barca career and No.10 before leaving. What other number has he worn for the club?',
        choice1: '9',
        choice2: '20',
        choice3: '11',
        choice4: '19' ,
        answer: 4,
    },
    {
        question: 'Which Portuguese island off the coast of Africa, which also shares its name with a cake, is Ronaldo from?',
        choice1: 'Sao Jorge',
        choice2: 'Madeira',
        choice3: 'Funchal',
        choice4: 'Flores' ,
        answer: 2,
     },
     {
        question: 'Which German multinational sportswear company is Messi an ambassador for?',
        choice1: 'New Balance',
        choice2: 'Nike',
        choice3: 'Adidas',
        choice4: 'Puma' ,
        answer: 3,
    },
    {
        question: 'Ronaldo is synonymous with the No.7, but what other number did he wear at Real Madrid?',
        choice1: '11',
        choice2: '10',
        choice3: '15',
        choice4: '9' ,
        answer: 4,
    },
    {
        question: 'What international team play in Wembley?',
        choice1: 'England',
        choice2: 'Whales',
        choice3: 'Ireland',
        choice4: 'Scotland' ,
        answer: 1,
    },
    {
        question: 'Which of these teams is not from London?',
        choice1: 'Arsenal',
        choice2: 'Fulham',
        choice3: 'West Ham',
        choice4: 'Wolves' ,
        answer: 4,
    },
    {
        question: 'Which International women team does Megan Rapinoe Play for?',
        choice1: 'England',
        choice2: 'USA',
        choice3: 'Norway',
        choice4: 'Japan' ,
        answer: 2,
    },
    {
        question: 'Which Player won the 2006 Golden Boy award?',
        choice1: 'Lionel Messi',
        choice2: 'Sergio Aguero',
        choice3: 'Cristiano Ronaldo',
        choice4: 'Cesc Fabregas' ,
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()