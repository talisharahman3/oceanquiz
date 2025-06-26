const questions = [
  {
    question: "What is the largest ocean?",
    answers: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correct: "Pacific",
    fact: "The Pacific Ocean covers about 63 million square miles and contains more than half of Earth's free water!"
  },
  {
    question: "Which ocean surrounds Antarctica?",
    answers: ["Indian", "Pacific", "Atlantic", "Southern"],
    correct: "Southern",
    fact: "The Southern Ocean was officially recognized as the fifth ocean in 2000."
  },
  {
    question: "Which is the saltiest ocean?",
    answers: ["Pacific", "Atlantic", "Arctic", "Indian"],
    correct: "Atlantic",
    fact: "The Atlantic has high evaporation and fewer rivers, making it saltier."
  },
  {
    question: "Which ocean is the smallest?",
    answers: ["Indian", "Arctic", "Southern", "Pacific"],
    correct: "Arctic",
    fact: "The Arctic is the smallest and shallowest ocean in the world."
  },
  {
    question: "How much of Earth is covered by ocean?",
    answers: ["50%", "60%", "70%", "80%"],
    correct: "70%",
    fact: "Around 71% of Earth’s surface is ocean."
  },
  {
    question: "Where is the Mariana Trench?",
    answers: ["Atlantic", "Southern", "Indian", "Pacific"],
    correct: "Pacific",
    fact: "It’s the deepest ocean trench in the world — over 36,000 feet deep!"
  },
  {
    question: "What causes ocean tides?",
    answers: ["Wind", "Sun", "Moon", "Earthquakes"],
    correct: "Moon",
    fact: "The Moon’s gravity pulls ocean water, creating tides."
  },
  {
    question: "Which current is warm?",
    answers: ["California", "Humboldt", "Gulf Stream", "Canary"],
    correct: "Gulf Stream",
    fact: "The Gulf Stream carries warm water from the Gulf of Mexico up the Atlantic coast."
  },
  {
    question: "What percent of ocean is unexplored?",
    answers: ["30%", "50%", "70%", "80%"],
    correct: "80%",
    fact: "Over 80% of the ocean remains unmapped and unexplored!"
  },
  {
    question: "Which is NOT a real ocean zone?",
    answers: ["Sunlight", "Twilight", "Rainbow", "Midnight"],
    correct: "Rainbow",
    fact: "Real zones include: Sunlight, Twilight, Midnight, Abyssal, and Hadal."
  }
];

const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress');
const scoreDisplay = document.getElementById('score-display');
const reviewBox = document.getElementById('answer-review');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const musicToggle = document.getElementById('music-toggle');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const bgMusic = document.getElementById('bg-music');

let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let results = [];
let musicPlaying = false;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
musicToggle.addEventListener('click', toggleMusic);

function startQuiz() {
  startScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;
  results = [];
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = shuffledQuestions[currentQuestion];
  const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
  questionText.textContent = question.question;
  progressText.innerHTML = `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;
  shuffledAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer-btn');
    button.addEventListener('click', () => selectAnswer(answer, question.correct, question.question, question.fact));
    answerButtons.appendChild(button);
  });
  startTimer(15);
}

function startTimer(seconds) {
  clearInterval(timer);
  const timerDisplay = document.createElement('div');
  timerDisplay.id = 'timer';
  timerDisplay.textContent = `Time left: ${seconds}s`;
  progressText.appendChild(timerDisplay);
  let timeLeft = seconds;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      wrongSound.play();
      results.push({
        question: shuffledQuestions[currentQuestion].question,
        selected: "Time's up!",
        correct: shuffledQuestions[currentQuestion].correct,
        fact: shuffledQuestions[currentQuestion].fact
      });
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(selected, correct, question, fact) {
  clearInterval(timer);
  const isCorrect = selected === correct;
  if (isCorrect) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.textContent === correct) {
      button.classList.add('correct');
    } else if (button.textContent === selected && !isCorrect) {
      button.classList.add('wrong');
    }
    button.classList.add('pulse');
  });
  results.push({ question, selected, correct, fact });
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  const percentage = Math.round((score / questions.length) * 100);
  const highScore = localStorage.getItem('oceanQuizHighScore') || 0;
  if (score > highScore) {
    localStorage.setItem('oceanQuizHighScore', score);
    scoreDisplay.textContent = `🏆 ${score}/${questions.length} (${percentage}%) - New High Score!`;
  } else {
    scoreDisplay.textContent = `🌊 ${score}/${questions.length} (${percentage}%) (High Score: ${highScore})`;
  }
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  reviewBox.innerHTML = '<h3>Quiz Review:</h3>';
  results.forEach(result => {
    const isCorrect = result.selected === result.correct;
    const reviewItem = document.createElement('div');
    reviewItem.innerHTML = `
      <p><strong>Q:</strong> ${result.question}</p>
      <p><strong>Your answer:</strong> ${result.selected} ${isCorrect ? '✅' : '❌'}</p>
      <p><strong>Correct answer:</strong> ${result.correct}</p>
      ${result.fact ? `<p class="fact">💡 ${result.fact}</p>` : ''}
    `;
    reviewBox.appendChild(reviewItem);
  });
}

function resetState() {
  clearInterval(timer);
  answerButtons.innerHTML = '';
}

function restartQuiz() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

function toggleMusic() {
  musicPlaying = !musicPlaying;
  musicToggle.textContent = musicPlaying ? '🔊' : '🔇';
  if (musicPlaying) {
    bgMusic.play().catch(e => console.log("Music error:", e));
  } else {
    bgMusic.pause();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bgMusic.load();
  try {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.textContent = '🔊';
    }).catch(() => {
      musicPlaying = false;
      musicToggle.textContent = '🔇';
    });
  } catch (e) {
    console.log("Autoplay blocked:", e);
  }
});
