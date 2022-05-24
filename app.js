let startButton = document.getElementById("start-btn");
let restartButton = document.getElementById("restart-btn");
let nextButton = document.getElementById("next-btn");
let questionSection = document.getElementById("question-section");
let quizTitle = document.getElementById("quiz-title");
let questionNumber = 1;
let question = document.getElementById("question");
let answerButtons = document.getElementsByClassName("answer-btn");
let resultMessage = document.getElementById("result-msg");
let currentQuestionIndex = 0;
let count = 0; //setting a counter for a number of questions answered correctly

//selecting button to start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  //hide start and restart buttons
  startButton.classList.add("hide");
  restartButton.classList.add("hide");

  //unhide question section
  questionSection.classList.remove("hide");

  /* 
  styled General Knowledge Quiz title here to show a different position and styling 
  when the title is referenced in the Question & Answers pages
  the General Knowledge Quiz title referenced in the Start page is styled through CSS
  */

  quizTitle.style.color = "#009688";
  quizTitle.style.fontSize = "20px";
  quizTitle.style.marginLeft = "10px";
  quizTitle.style.textAlign = "left";
  quizTitle.style.marginTop = "10px";

  showQuestion(currentQuestionIndex);
}

function showQuestion(currentQuestionIndex) {
  question.innerHTML = `${questionNumber++}. ${
    allQuestions[currentQuestionIndex].question
  }`;
  nextButton.classList.remove("hide");

  resultMessage.innerHTML = "";

  let answerArray = allQuestions[currentQuestionIndex].answerOptions.length;

  for (let i = 0; i < answerArray; i++) {
    let correct = allQuestions[currentQuestionIndex].correct;
    answerButtons[i].style.backgroundColor = "";
    console.log(correct);
    answerButtons[i].innerHTML =
      allQuestions[currentQuestionIndex].answerOptions[i];

    answerButtons[i].addEventListener("click", function () {
      console.log(answerButtons[i]);
      if (answerButtons[i] == correct) {
        console.log(answerButtons[i]);
        console.log(answerButtons[i].value);
        answerButtons[i].style.backgroundColor = "#009688";
        resultMessage.innerHTML = "Correct! Well Done 👏";
        count++;
      } else {
        answerButtons[i].style.backgroundColor = "red";
        resultMessage.innerHTML = "Wrong Answer!";
      }
    });
  }
}

/*
The Next button appears from Q1
if Next button is selected but the answer has not been given then "Select answer!" message is displayed
if Next button is selected and the answer has been given then proceed to the next Question
if Next button is selected and the current Questio is the last Question then display Score page
*/
nextButton.addEventListener("click", () => {
  if (resultMessage.innerHTML == "") {
    resultMessage.innerHTML = "Select answer!";
  } else if (
    resultMessage.innerHTML == "Wrong Answer!" ||
    resultMessage.innerHTML == "Correct! Well Done 👏"
  ) {
    nextQuestion();
  }

  if (currentQuestionIndex == allQuestions.length - 1) {
    nextButton.addEventListener("click", () => {
      displayScore();
    });
  }
});

function nextQuestion() {
  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
}

function displayScore() {
  nextButton.classList.add("hide");
  resultMessage.classList.add("hide");
  questionSection.innerHTML = `SCORE: ${count} / ${allQuestions.length}`; //!!!!!!!!!!!!!!!!!!!!!!!!!!It counts correct ALSO the previous question index, if that answer was correct or not
  restartButton.classList.remove("hide");

  //location.reload() reloads the current URL (like a refresh button) and thus restarts the quiz from the beginning
  restartButton.addEventListener(
    "click",
    function (e) {
      location.reload();
    },
    false
  );
}

let allQuestions = [
  {
    question: "What is the capital of Finland?",
    answerOptions: ["Tokyo", "Stockholm", "Helsinki", "Oslo"],
    correct: 2,
  },
  {
    question: "Which planet is closest to the sun?",
    answerOptions: ["Mercury", "Earth", "Jupiter", "Mars"],
    correct: 0,
  },
  {
    question: "What is the smallest country in the world?",
    answerOptions: ["Malta", "Monaco", "Iceland", "Vatican City"],
    correct: 3,
  },
  {
    question: "Who painted Mona Lisa?",
    answerOptions: [
      "Picasso",
      "Michelangelo",
      "Vincent van Gogh",
      "Leonardo da Vinci",
    ],
    correct: 3,
  },
  {
    question: "What's a baby rabbit called?",
    answerOptions: ["Kitten", "Hare", "Peter", "Rabit"],
    correct: 0,
  },
  {
    question: "Who invented a World Wide Web?",
    answerOptions: [
      "Jack Dorsey",
      "Tim Berners-Lee",
      "Thomas Edison",
      "Albert Einstein",
    ],
    correct: 1,
  },
];
