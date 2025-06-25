const questions = [
    { question: "What is the largest ocean?", answers: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: "Pacific" },
    { question: "Which ocean surrounds Antarctica?", answers: ["Indian", "Pacific", "Atlantic", "Southern"], correct: "Southern" },
    { question: "Which is the saltiest ocean?", answers: ["Pacific", "Atlantic", "Arctic", "Indian"], correct: "Atlantic" },
    { question: "Which ocean is the smallest?", answers: ["Indian", "Arctic", "Southern", "Pacific"], correct: "Arctic" },
    { question: "How much of Earth is covered by ocean?", answers: ["50%", "60%", "70%", "80%"], correct: "70%" },
    { question: "Where is the Mariana Trench?", answers: ["Atlantic", "Southern", "Indian", "Pacific"], correct: "Pacific" },
    { question: "What causes ocean tides?", answers: ["Wind", "Sun", "Moon", "Earthquake"], correct: "Moon" },
    { question: "Which current is warm?", answers: ["California", "Humboldt", "Gulf Stream", "Canary"], correct: "Gulf Stream" },
    { question: "What percent of ocean is unexplored?", answers: ["30%", "50%", "70%", "80%"], correct: "80%" },
    { question: "Which is NOT a real ocean layer?", answers: ["Sunlight", "Twilight", "Rainbow", "Midnight"], correct: "Rainbow" }
  ];
  
  let shuffledQuestions = [];
  let currentQuestion = 0;
  let score = 0;
  let results = [];
  
  const startBtn = document.getElementById("start-btn");
  const quizContainer = document.getElementById("quiz-container");
  const startScreen = document.getElementById("start-screen");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const resultScreen = document.getElementById("result-screen");
  const scoreDisplay = document.getElementById("score-display");
  const restartBtn = document.getElementById("restart-btn");
  const progress = document.getElementById("progress");
  const reviewBox = document.getElementById("answer-review");
  
  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");
  
  startBtn.addEventListener("click", startQuiz);
  restartBtn.addEventListener("click", () => location.reload());
  
  function startQuiz() {
    startScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    score = 0;
    results = [];
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const q = shuffledQuestions[currentQuestion];
    q.answers = [...q.answers].sort(() => Math.random() - 0.5);
    questionText.textContent = q.question;
    progress.textContent = `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;
  
    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.addEventListener("click", () => selectAnswer(btn, q.correct, q.question));
      answerButtons.appendChild(btn);
    });
  }
  
  function resetState() {
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(selectedBtn, correctAnswer, questionText) {
    const isCorrect = selectedBtn.textContent === correctAnswer;
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      correctSound.play();
      score++;
    } else {
      selectedBtn.classList.add("wrong");
      wrongSound.play();
    }
  
    results.push({ question: questionText, selected: selectedBtn.textContent, correct: correctAnswer });
  
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) btn.classList.add("correct");
    });
  
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1000);
  }
  
  function showResult() {
    quizContainer.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreDisplay.textContent = `You got ${score} out of ${questions.length} correct!`;
  
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 100, spread: 60 }), 400);
    setTimeout(() => confetti({ particleCount: 100, spread: 60 }), 800);
  
    reviewBox.innerHTML = "<h3>Question Review:</h3>";
    results.forEach(entry => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>Q:</strong> ${entry.question}<br>
                       <strong>Your Answer:</strong> ${entry.selected} ${entry.selected === entry.correct ? "✅" : "❌"}<br>
                       <strong>Correct:</strong> ${entry.correct}<hr>`;
      reviewBox.appendChild(div);
    });
  }
  