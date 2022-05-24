let startButton = document.getElementById("start-btn");
let restartButton = document.getElementById("restart-btn");
let nextButton = document.getElementById("next-btn");
let questionSection = document.getElementById("question-section");
let quizTitle = document.getElementById("quiz-title");
let questionNumber = 1;
let question = document.getElementById("question");
let answerSection = document.getElementById("answer-section");
let answer1 = document.getElementById("answer-1");
let answer2 = document.getElementById("answer-2");
let answer3 = document.getElementById("answer-3");
let answer4 = document.getElementById("answer-4");
let resultMessage = document.getElementById("result-msg");
let currentQuestionIndex = 0;
let correct = 0; //setting a counter for a number of questions answered correctly

//selecting button to start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  //hide start and restart buttons
  startButton.classList.add("hide");
  restartButton.classList.add("hide");

  //unhide question section
  questionSection.classList.remove("hide");

  /* 
  styled General Knowledge Quiz title here because wanted to show a different position and styling 
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

  /* 
  answers buttons are initially disabled in HTML then enabled here, this is to allow for 
  Questions after Q1 to clear the answer button selection, without the below code the Questions following Q1
  are showing which answer[i] was selected for Q1
  */
  answer1.disabled = false;
  answer2.disabled = false;
  answer3.disabled = false;
  answer4.disabled = false;

  //answer1.value = allQuestions[currentQuestionIndex].answer[0].isCorrect;

  /*
  after NEXT button is selected once Q1 is answered the below code will remove the previous answer button's background color and
  results message to clear this for the next Question
 
  answer1.style.backgroundColor = "";
  answer2.style.backgroundColor = "";
  answer3.style.backgroundColor = "";
  answer4.style.backgroundColor = "";
  resultMessage.innerHTML = ""; */
  //assigning answer array's values from allQuestions array to answer buttons in HTML
  answer1.innerHTML = allQuestions[currentQuestionIndex].answer[0].text;
  answer2.innerHTML = allQuestions[currentQuestionIndex].answer[1].text;
  answer3.innerHTML = allQuestions[currentQuestionIndex].answer[2].text;
  answer4.innerHTML = allQuestions[currentQuestionIndex].answer[3].text;

  /*
  when answer button is clicked:
  the relevant result message appears(to display correct or wrong answer)
  the selected answer changes the background color depending on correctness of the answer
  only one answer is possible, once one answer is selected the rest of the answer buttons are disabled
  */

  answer1.addEventListener("click", () => {
    if (allQuestions[currentQuestionIndex].answer[0].isCorrect) {
      answer1.style.backgroundColor = "#009688";
      resultMessage.innerHTML = "Correct! Well Done 👏";
      answer2.disabled = true;
      answer3.disabled = true;
      answer4.disabled = true;
      correct++;
      console.log(allQuestions[currentQuestionIndex].answer[0].isCorrect);
      console.log(correct);
    } else {
      answer1.style.backgroundColor = "red";
      resultMessage.innerHTML = "Wrong Answer!";
      answer2.disabled = true;
      answer3.disabled = true;
      answer4.disabled = true;
    }
  });

  answer2.addEventListener("click", () => {
    if (allQuestions[currentQuestionIndex].answer[1].isCorrect) {
      answer2.style.backgroundColor = "#009688";
      resultMessage.innerHTML = "Correct! Well Done 👏";
      correct++;
      answer1.disabled = true;
      answer3.disabled = true;
      answer4.disabled = true;
    } else {
      answer2.style.backgroundColor = "red";
      resultMessage.innerHTML = "Wrong Answer!";
      answer1.disabled = true;
      answer3.disabled = true;
      answer4.disabled = true;
    }
  });

  answer3.addEventListener("click", () => {
    if (allQuestions[currentQuestionIndex].answer[2].isCorrect) {
      answer3.style.backgroundColor = "#009688";
      resultMessage.innerHTML = "Correct! Well Done 👏";
      correct++;
      answer1.disabled = true;
      answer2.disabled = true;
      answer4.disabled = true;
    } else {
      answer3.style.backgroundColor = "red";
      resultMessage.innerHTML = "Wrong Answer!";
      answer1.disabled = true;
      answer2.disabled = true;
      answer4.disabled = true;
    }
  });

  answer4.addEventListener("click", () => {
    if (allQuestions[currentQuestionIndex].answer[3].isCorrect) {
      answer4.style.backgroundColor = "#009688";
      resultMessage.innerHTML = "Correct! Well Done 👏";
      correct++;
      answer1.disabled = true;
      answer2.disabled = true;
      answer3.disabled = true;
    } else {
      answer4.style.backgroundColor = "red";
      resultMessage.innerHTML = "Wrong Answer!";
      answer1.disabled = true;
      answer2.disabled = true;
      answer3.disabled = true;
    }
  });
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
  questionSection.innerHTML = `SCORE: ${correct} / ${allQuestions.length}`; //!!!!!!!!!!!!!!!!!!!!!!!!!!It counts correct ALSO the previous question index, if that answer was correct
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
    answer: [
      {
        text: "Tokyo",
        isCorrect: false,
      },
      {
        text: "Stockholm",
        isCorrect: false,
      },
      {
        text: "Helsinki",
        isCorrect: true,
      },
      {
        text: "Oslo",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Which planet is closest to the sun?",
    answer: [
      {
        text: "Mercury",
        isCorrect: true,
      },
      {
        text: "Earth",
        isCorrect: false,
      },
      {
        text: "Jupiter",
        isCorrect: false,
      },
      {
        text: "Mars",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Who painted Mona Lisa?",
    answer: [
      {
        text: "Picasso",
        isCorrect: false,
      },
      {
        text: "Michelangelo",
        isCorrect: false,
      },
      {
        text: "Vincent van Gogh",
        isCorrect: false,
      },
      {
        text: "Leonardo da Vinci",
        isCorrect: true,
      },
    ],
  },
  {
    question: "What's a baby rabbit called?",
    answer: [
      {
        text: "Kitten",
        isCorrect: true,
      },
      {
        text: "Hare",
        isCorrect: false,
      },
      {
        text: "Peter",
        isCorrect: false,
      },
      {
        text: "Rabbit",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Who invented a World Wide Web?",
    answer: [
      {
        text: "Jack Dorsey",
        isCorrect: false,
      },
      {
        text: "Thomas Edison",
        isCorrect: false,
      },
      {
        text: "Tim Berners-Lee",
        isCorrect: true,
      },
      {
        text: "Albert Einstein",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the smallest country in the world?",
    answer: [
      {
        text: "Vatican City",
        isCorrect: true,
      },
      {
        text: "Monaco",
        isCorrect: false,
      },
      {
        text: "Liechtenstein",
        isCorrect: false,
      },
      {
        text: "Malta",
        isCorrect: false,
      },
    ],
  },
];
