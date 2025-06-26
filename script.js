const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Trainer Marking Language"],
    answer: 1
  },
  {
    question: "Which HTML element do we put the JavaScript in?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: 0
  },
  {
    question: "What is the correct syntax to change the content of an HTML element?",
    options: ["#demo.innerHTML = 'Hello'", "document.getElementById('demo').innerHTML = 'Hello';", "document.getElement('demo').innerHTML = 'Hello';", "demo.innerHTML = 'Hello';"],
    answer: 1
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function = myFunction()", "function:myFunction()", "def myFunction()"],
    answer: 0
  },
  {
    question: "How do you call a function named 'myFunction'?",
    options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction()"],
    answer: 1
  },
  {
    question: "How can you add a comment in JavaScript?",
    options: ["<!--Comment-->", "// Comment", "'Comment", "**Comment**"],
    answer: 1
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["v carName;", "var carName;", "variable carName;", "carName = var;"],
    answer: 1
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["-", "*", "=", "+"],
    answer: 2
  },
  {
    question: "What will `typeof []` return?",
    options: ["object", "array", "list", "undefined"],
    answer: 0
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onmouseover", "onclick"],
    answer: 3
  }
];

let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];

const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreBox = document.getElementById("score");

function startQuiz() {
  shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hide");
  document.getElementById("quiz-box").classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  clearOptions();
  const q = shuffledQuestions[currentIndex];
  questionBox.textContent = q.question;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(button, index));
    optionsBox.appendChild(button);
  });
}

function clearOptions() {
  optionsBox.innerHTML = "";
}

function selectAnswer(button, selectedIndex) {
  const correct = shuffledQuestions[currentIndex].answer;

  Array.from(optionsBox.children).forEach(btn => btn.disabled = true);

  if (selectedIndex === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    optionsBox.children[correct].classList.add("correct");
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  document.getElementById("quiz-box").classList.add("hide");
  resultBox.classList.remove("hide");
  scoreBox.textContent = score;
}

function restartQuiz() {
  startQuiz();
}

startQuiz();
