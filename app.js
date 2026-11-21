/**
 * EduBuddy - Frontend Interactive Logic
 * Features:
 * - Multi-level concept switching (ELI5, High School, College, Cheat Sheet)
 * - Interactive diagnostic quiz with misconception feedback
 * - 3D Flashcards active recall
 * - Native Browser Text-to-Speech (TTS)
 * - Canvas Confetti celebration
 * - Dual Engine: Smart Instant Presets (reliable for hackathon demos) + Live Gemini API
 */

// Comprehensive offline datasets for flawless hackathon presentations
const KNOWLEDGE_BASE = {
  "quantum superposition": {
    eli5: {
      title: "Quantum Superposition",
      level: "ELI5 (Analogy)",
      tldr: "While normal computers use bits that are strictly 0 or 1, quantum computers use qubits that explore both simultaneously until observed.",
      analogy: "Think of a coin spinning on a table. While it's spinning, it is both Heads and Tails simultaneously! It only becomes one or the other when you slap your hand down to stop it. Classical computers only look at coins already flat on the table.",
      misconception: "Myth: Quantum computers are just faster laptops for gaming. Reality: They are specialized probability machines built for complex combinatorics like molecular simulations.",
      application: "Simulating molecular folding to discover life-saving medicines in days rather than decades.",
      memory: "SPIN: Superposition Particles Intuitively Navigate complex states.",
      breakdown: [
        { subheading: "1. The Spinning Coin", explanation: "Regular bits are like a static light switch (ON or OFF). A qubit is like a spinning sphere holding both states at once." },
        { subheading: "2. The Slap Down (Measurement)", explanation: "When we measure a qubit, the delicate quantum state collapses into a normal 0 or 1." },
        { subheading: "3. Exponential Power", explanation: "Two qubits test 4 states at once, 3 test 8, and 50 test quadrillions of combinations simultaneously." }
      ]
    },
    highschool: {
      title: "Quantum Superposition",
      level: "High School (Foundational)",
      tldr: "Superposition is a fundamental principle of quantum mechanics where a physical system exists in multiple states simultaneously as a linear combination of probability amplitudes.",
      analogy: "Think of musical harmony: when you play two notes simultaneously on a piano, the resulting sound is not just note A or note B, but a composite wave combining both.",
      misconception: "Students often believe the particle is physically vibrating back and forth between 0 and 1. In reality, it mathematically occupies a superposition vector until measured.",
      application: "Quantum key distribution (QKD) creating unbreakable encrypted military communications.",
      memory: "BRA: Both Realities Activated until wave collapse.",
      breakdown: [
        { subheading: "1. Wave-Particle Duality", explanation: "Matter at atomic scales exhibits wave-like interference patterns, described mathematically by the Schrödinger wave equation." },
        { subheading: "2. Wavefunction Collapse", explanation: "Observation causes decoherence, forcing the probabilistic wave to settle into a discrete eigenstate." },
        { subheading: "3. Constructive Interference", explanation: "Quantum algorithms cancel out incorrect paths and amplify the correct answer's probability amplitude." }
      ]
    },
    college: {
      title: "Quantum Superposition",
      level: "College / Deep Dive",
      tldr: "A qubit's state |ψ⟩ is represented as a normalized vector on the Bloch Sphere: |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1.",
      analogy: "A vector pointing anywhere on the surface of a unit sphere (Bloch sphere) parametrized by angles θ and φ, mapped via unitary transformation matrices.",
      misconception: "Assuming measurement reveals an already predetermined hidden variable. Bell's theorem mathematically disproves local hidden variables.",
      application: "Shor's algorithm for polynomial-time prime factorization, breaking RSA encryption.",
      memory: "|ψ⟩ = α|0⟩ + β|1⟩ with Born rule probabilities.",
      breakdown: [
        { subheading: "1. Hilbert Space Formulation", explanation: "Quantum states exist as rays in a complex Hilbert space equipped with inner products and Hermitian observables." },
        { subheading: "2. Unitary Operations", explanation: "Quantum gates (Hadamard, CNOT, Pauli-X) correspond to unitary matrices (U†U = I) preserving state normalization." },
        { subheading: "3. Quantum Decoherence", explanation: "Thermal and electromagnetic environmental coupling leads to off-diagonal density matrix decay: ρ_ij → 0." }
      ]
    },
    cheatsheet: {
      title: "Quantum Superposition — Rapid Revision",
      level: "Exam Cheat Sheet",
      tldr: "|ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1. Measurement collapses to |0⟩ with P = |α|² and |1⟩ with P = |β|².",
      analogy: "Unitary vector rotation on Bloch sphere until projective measurement operator (P = |v⟩⟨v|) acts.",
      misconception: "DO NOT say 'qubit is 0 and 1 at the same time' on an exam. State: 'linear superposition of computational basis states'.",
      application: "Grover's Search (O(√N)), Shor's Factorization (polynomial time).",
      memory: "Hadamard H creates equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2.",
      breakdown: [
        { subheading: "Formula 1: Born Rule", explanation: "P(x) = |⟨x|ψ⟩|²" },
        { subheading: "Formula 2: Hadamard Gate", explanation: "H = 1/√2 [[1, 1], [1, -1]]" },
        { subheading: "Common Trap", explanation: "No-Cloning Theorem: An unknown quantum state cannot be copied perfectly." }
      ]
    },
    quiz: [
      {
        id: 1,
        question: "What physically happens when a quantum superposition state is measured?",
        options: [
          "It permanently splits into two classical computers",
          "The wavefunction collapses into a single discrete classical state",
          "The particle gains infinite electrical energy",
          "It reverts to binary ASCII characters"
        ],
        correct: 1,
        explanation: "Correct! Measurement forces the probabilistic superposition vector to collapse into one definite basis state (|0⟩ or |1⟩).",
        misconception: "Misconception: Measurement does not create energy or duplicate hardware; it eliminates phase coherence and extracts one scalar outcome according to the Born rule."
      },
      {
        id: 2,
        question: "Why is a qubit capable of exploring search spaces exponentially faster than a classical bit?",
        options: [
          "Qubits have higher clock frequencies than modern silicon CPUs",
          "N qubits represent a state space of 2^N simultaneous amplitudes",
          "Quantum wires generate zero electrical resistance at room temperature",
          "Qubits use optical fiber laser pointers"
        ],
        correct: 1,
        explanation: "Correct! A system of N qubits spans a Hilbert space dimension of 2^N, allowing simultaneous interference across exponential possibilities.",
        misconception: "Misconception: Quantum processors actually have lower clock rates (MHz) than Intel/Apple silicon (GHz). The speedup is purely algorithmic and dimensional."
      }
    ],
    flashcards: [
      { front: "What is a Qubit's mathematical state vector?", back: "|ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1." },
      { front: "What does the Hadamard (H) Gate do?", back: "Transforms standard basis state |0⟩ into an equal superposition: (|0⟩ + |1⟩)/√2." },
      { front: "What is the No-Cloning Theorem?", back: "It is mathematically impossible to create an identical copy of an arbitrary unknown quantum state." }
    ]
  },

  "backpropagation & neural networks": {
    eli5: {
      title: "Backpropagation in Neural Networks",
      level: "ELI5 (Analogy)",
      tldr: "Backpropagation is how an AI learns from its mistakes by adjusting each dial backwards from the error it made.",
      analogy: "Imagine an archery student shooting an arrow. The arrow lands 2 feet too high. The coach watches the flight and says: 'Lower your elbow by 2 inches and loosen your grip'. That feedback going backwards from the target to each body joint is backprop!",
      misconception: "AI does not 'think' like a human brain; it is a giant math formula tweaking thousands of tiny weight sliders.",
      application: "Face ID unlocking your phone and Tesla self-driving camera detection.",
      memory: "Target Hit $\rightarrow$ Measure Miss $\rightarrow$ Tune Knobs Backwards.",
      breakdown: [
        { subheading: "1. Forward Pass (The Guess)", explanation: "Input data travels forward through layers of math nodes to generate a prediction." },
        { subheading: "2. Loss Calculation (The Error)", explanation: "The network compares its guess against the true label to calculate how wrong it was." },
        { subheading: "3. Backward Pass (The Correction)", explanation: "Using calculus (the chain rule), it distributes blame to every internal knob (weight)." }
      ]
    },
    highschool: {
      title: "Backpropagation in Neural Networks",
      level: "High School (Foundational)",
      tldr: "Backprop is the algorithm used to train artificial neural networks by computing the gradient of the loss function with respect to each weight using the chain rule.",
      analogy: "Rolling a ball down a foggy mountain: you cannot see the bottom, but you can feel the slope under your feet and take steps in the steepest downward direction (gradient descent).",
      misconception: "Backprop is not the optimizer itself; backprop computes the derivatives (slopes), while algorithms like SGD or Adam take the actual steps.",
      application: "Language translation (Google Translate) and voice assistants (Siri, Alexa).",
      memory: "Chain Rule gives Gradients; Gradients update Weights.",
      breakdown: [
        { subheading: "1. The Loss Function", explanation: "Measures error (e.g. Mean Squared Error or Cross-Entropy) between network output and target." },
        { subheading: "2. The Chain Rule", explanation: "Calculates how changes in early layers affect the final loss: dL/dw = (dL/dy) * (dy/dz) * (dz/dw)." },
        { subheading: "3. Learning Rate", explanation: "A multiplier controlling how large of a step weights take in the direction of steepest descent." }
      ]
    },
    college: {
      title: "Backpropagation in Neural Networks",
      level: "College / Deep Dive",
      tldr: "Reverse-mode automatic differentiation computing ∂L/∂W_l = δ_l · (a_{l-1})^T, where δ_l = (W_{l+1}^T δ_{l+1}) ⊙ σ'(z_l).",
      analogy: "Dynamic programming on a directed acyclic computation graph (DAG), caching intermediate activations during the forward pass to avoid redundant partial derivative calculations.",
      misconception: "Assuming exploding/vanishing gradients are solely caused by deep layers; choice of non-saturating activation functions (ReLU vs Sigmoid) and proper initialization (He/Xavier) are critical.",
      application: "Training frontier transformer models (GPT-4, Gemini) on massive GPU/TPU clusters.",
      memory: "δ_l = (W_{l+1}^T δ_{l+1}) ⊙ σ'(z_l)",
      breakdown: [
        { subheading: "1. Computational Graph Caching", explanation: "Forward pass caches activations a_l and pre-activations z_l required for gradient back-propagation." },
        { subheading: "2. Vectorized Jacobian Products", explanation: "Rather than computing full Jacobian matrices, efficient implementations compute vector-Jacobian products (VJP)." },
        { subheading: "3. Optimization Dynamics", explanation: "Momentum and adaptive second-moment estimates (AdamW) normalize gradient scales across sparse features." }
      ]
    },
    cheatsheet: {
      title: "Backpropagation — Exam Cheat Sheet",
      level: "Exam Cheat Sheet",
      tldr: "Weight update: W := W - η · (∂L/∂W). Computed via chain rule from output back to input.",
      analogy: "Gradient vector points in direction of steepest ascent; move in negative direction.",
      misconception: "Remember: Sigmoid derivative σ'(z) = σ(z)(1 - σ(z)) maxes at 0.25, causing vanishing gradients in deep networks.",
      application: "Deep Learning Foundations, Convolutional Nets, Transformers.",
      memory: "Weight = Weight - (LearningRate * Gradient)",
      breakdown: [
        { subheading: "Key Formula 1", explanation: "∂L/∂w = ∂L/∂y * ∂y/∂z * ∂z/∂w" },
        { subheading: "Key Formula 2", explanation: "W_new = W_old - η * ∇L" },
        { subheading: "Exam Trap", explanation: "Dead ReLUs: If a neuron's activation is negative, gradient is 0, halting learning." }
      ]
    },
    quiz: [
      {
        id: 1,
        question: "What mathematical principle makes backpropagation computationally efficient?",
        options: [
          "The Calculus Chain Rule combined with dynamic programming (caching intermediate values)",
          "Brute-force trial and error of random weights",
          "Fourier transforms of image pixels",
          "Polynomial factorization"
        ],
        correct: 0,
        explanation: "Correct! The chain rule allows reuse of intermediate layer outputs (dynamic programming), turning what would be exponential computation into O(edges).",
        misconception: "Misconception: Backpropagation is not random guessing; it calculates exact analytical gradients via calculus."
      },
      {
        id: 2,
        question: "Why did deep networks using Sigmoid activation functions suffer from the 'Vanishing Gradient' problem?",
        options: [
          "The maximum derivative of the sigmoid function is 0.25, causing gradients to shrink exponentially across layers",
          "Sigmoids require negative voltage on GPUs",
          "Sigmoid curves cannot represent numbers greater than 100",
          "Backpropagation only works with linear equations"
        ],
        correct: 0,
        explanation: "Correct! Since σ'(z) is at most 0.25, multiplying fractions across 10+ layers causes gradients to approach zero, preventing early layers from updating.",
        misconception: "Misconception: The issue isn't GPU voltage or hardware limits, but repeated mathematical multiplication of values less than 1."
      }
    ],
    flashcards: [
      { front: "What does the Learning Rate (η) control?", back: "The step size taken in the direction of the negative gradient during weight update." },
      { front: "Why is ReLU preferred over Sigmoid in hidden layers?", back: "Derivative is 1 for positive inputs, preventing the vanishing gradient problem." },
      { front: "What is the difference between Loss and Cost?", back: "Loss evaluates a single training sample; Cost evaluates the average loss over the entire dataset/batch." }
    ]
  }
};

// Application State
let currentTopicKey = "quantum superposition";
let currentLevel = "eli5";
let currentMode = "demo"; // "demo" or "api"
let geminiApiKey = "";
let currentScore = 0;
let answeredQuestions = new Set();
let isSpeaking = false;

// DOM Elements
const topicInput = document.getElementById("topic-input");
const btnExplain = document.getElementById("btn-explain");
const levelTabs = document.getElementById("level-tabs");
const resultsContainer = document.getElementById("results-container");
const loadingState = document.getElementById("loading-state");

// UI Renderers
function renderExplanation(data) {
  document.getElementById("res-title").textContent = data.title;
  document.getElementById("res-level-tag").textContent = data.level;
  document.getElementById("res-tldr").textContent = data.tldr;
  document.getElementById("res-analogy").textContent = data.analogy;
  document.getElementById("res-misconception").textContent = data.misconception;
  document.getElementById("res-application").textContent = data.application;
  document.getElementById("res-memory").textContent = data.memory;

  // Render Breakdown Cards
  const breakdownList = document.getElementById("res-breakdown-list");
  breakdownList.innerHTML = "";
  data.breakdown.forEach(item => {
    const card = document.createElement("div");
    card.className = "p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition";
    card.innerHTML = `
      <h4 class="font-bold text-slate-800 text-xs uppercase tracking-wide text-sky-800">${item.subheading}</h4>
      <p class="text-xs text-slate-600 mt-1 leading-relaxed">${item.explanation}</p>
    `;
    breakdownList.appendChild(card);
  });
}

function renderQuiz(questions) {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  answeredQuestions.clear();
  currentScore = 0;
  updateScoreDisplay(questions.length);

  questions.forEach((q, qIndex) => {
    const qCard = document.createElement("div");
    qCard.className = "bg-slate-800/80 rounded-2xl p-5 border border-indigo-700/50 space-y-4";
    qCard.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <h4 class="font-semibold text-sm sm:text-base text-white">
          <span class="text-indigo-400 font-bold mr-1.5">Q${qIndex + 1}.</span> ${q.question}
        </h4>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900 text-indigo-300 border border-indigo-700 shrink-0">1 Pt</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 options-grid">
        ${q.options.map((opt, optIndex) => `
          <button 
            class="option-btn text-left p-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition flex items-center justify-between"
            data-qindex="${qIndex}"
            data-optindex="${optIndex}">
            <span>${opt}</span>
            <i data-lucide="circle" class="w-4 h-4 text-slate-500 shrink-0 ml-2 opt-icon"></i>
          </button>
        `).join('')}
      </div>
      <div class="feedback-box hidden mt-3 p-3 rounded-xl text-xs space-y-1"></div>
    `;
    container.appendChild(qCard);
  });

  // Re-initialize Lucide icons
  safeLucide();

  // Attach Quiz Click Handlers
  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => handleOptionClick(btn, questions));
  });
}

function handleOptionClick(selectedBtn, questions) {
  const qIndex = parseInt(selectedBtn.dataset.qindex);
  const optIndex = parseInt(selectedBtn.dataset.optindex);
  const qData = questions[qIndex];

  if (answeredQuestions.has(qIndex)) return; // Prevent re-answering
  answeredQuestions.add(qIndex);

  const card = selectedBtn.closest(".bg-slate-800\\/80");
  const allBtns = card.querySelectorAll(".option-btn");
  const feedbackBox = card.querySelector(".feedback-box");

  // Disable all options in this question
  allBtns.forEach(btn => btn.classList.add("cursor-default", "pointer-events-none"));

  const isCorrect = (optIndex === qData.correct);

  if (isCorrect) {
    selectedBtn.classList.remove("border-slate-700", "bg-slate-800");
    selectedBtn.classList.add("border-emerald-500", "bg-emerald-950/60", "text-emerald-200");
    const icon = selectedBtn.querySelector(".opt-icon");
    if (icon) icon.outerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 ml-2"></i>`;

    feedbackBox.className = "feedback-box mt-3 p-3.5 rounded-xl text-xs bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 block";
    feedbackBox.innerHTML = `<strong>🎉 Spot on!</strong> ${qData.explanation}`;
    currentScore++;
  } else {
    selectedBtn.classList.remove("border-slate-700", "bg-slate-800");
    selectedBtn.classList.add("border-rose-500", "bg-rose-950/60", "text-rose-200");
    const icon = selectedBtn.querySelector(".opt-icon");
    if (icon) icon.outerHTML = `<i data-lucide="x-circle" class="w-4 h-4 text-rose-400 shrink-0 ml-2"></i>`;

    // Highlight the correct answer in green
    const correctBtn = allBtns[qData.correct];
    if (correctBtn) {
      correctBtn.classList.add("border-emerald-500", "bg-emerald-950/40", "text-emerald-300");
    }

    feedbackBox.className = "feedback-box mt-3 p-3.5 rounded-xl text-xs bg-rose-950/70 border border-rose-500/50 text-rose-200 block";
    feedbackBox.innerHTML = `
      <div><strong>❌ Intuitive Diagnostic:</strong> ${qData.misconception}</div>
      <div class="mt-1 text-slate-300"><strong>Why the other is correct:</strong> ${qData.explanation}</div>
    `;
  }

  safeLucide();
  updateScoreDisplay(questions.length);

  // Trigger celebration confetti if all correct!
  if (answeredQuestions.size === questions.length && currentScore === questions.length) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function updateScoreDisplay(total) {
  document.getElementById("quiz-score").textContent = `${currentScore} / ${total}`;
}

function renderFlashcards(cards) {
  const grid = document.getElementById("flashcards-grid");
  grid.innerHTML = "";

  cards.forEach(cardData => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "perspective h-44 cursor-pointer";
    cardWrapper.innerHTML = `
      <div class="card-flip transform-style-3d relative w-full h-full rounded-2xl shadow-sm border border-slate-200 bg-white">
        <!-- Front -->
        <div class="backface-hidden absolute inset-0 p-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-white to-slate-50">
          <div class="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Recall Question</span>
            <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
          </div>
          <p class="font-bold text-slate-800 text-sm text-center leading-snug">${cardData.front}</p>
          <span class="text-center text-[10px] font-semibold text-sky-600">Click to flip</span>
        </div>
        <!-- Back -->
        <div class="rotate-y-180 backface-hidden absolute inset-0 p-5 flex flex-col justify-between rounded-2xl bg-indigo-900 text-white">
          <div class="flex items-center justify-between text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
            <span>Core Answer</span>
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
          </div>
          <p class="text-xs text-indigo-100 text-center leading-relaxed font-medium">${cardData.back}</p>
          <span class="text-center text-[10px] font-semibold text-indigo-300">Click to flip back</span>
        </div>
      </div>
    `;

    cardWrapper.addEventListener("click", () => {
      const flipper = cardWrapper.querySelector(".card-flip");
      flipper.classList.toggle("flipped");
    });

    grid.appendChild(cardWrapper);
  });

  safeLucide();
}

// Load Content Orchestrator
async function loadTopic(topic, level) {
  const normalized = topic.toLowerCase().trim();
  loadingState.classList.remove("hidden");
  resultsContainer.classList.add("hidden");

  // Check if live API is requested and key exists
  if (currentMode === "api" && geminiApiKey) {
    try {
      const response = await fetch("http://localhost:8000/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, api_key: geminiApiKey })
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      
      loadingState.classList.add("hidden");
      resultsContainer.classList.remove("hidden");
      renderExplanation(data);
      return;
    } catch (err) {
      console.warn("Falling back to demo preset:", err);
    }
  }

  // Instant Demo Mode (High reliability)
  setTimeout(() => {
    loadingState.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    let dataset = KNOWLEDGE_BASE[normalized] || KNOWLEDGE_BASE["quantum superposition"];
    
    // Check if level exists in dataset
    const levelData = dataset[level] || dataset["eli5"];
    renderExplanation(levelData);
    renderQuiz(dataset.quiz || KNOWLEDGE_BASE["quantum superposition"].quiz);
    renderFlashcards(dataset.flashcards || KNOWLEDGE_BASE["quantum superposition"].flashcards);
  }, 350);
}

// Level Tab Switcher
levelTabs.querySelectorAll(".level-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    levelTabs.querySelectorAll(".level-tab").forEach(t => {
      t.classList.remove("bg-white", "shadow-sm", "text-sky-700", "font-bold");
      t.classList.add("text-slate-600");
    });
    tab.classList.add("bg-white", "shadow-sm", "text-sky-700", "font-bold");
    tab.classList.remove("text-slate-600");

    currentLevel = tab.dataset.level;
    loadTopic(topicInput.value || "Quantum Superposition", currentLevel);
  });
});

// Preset Chips
document.querySelectorAll(".preset-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const topic = chip.dataset.topic;
    topicInput.value = topic;
    loadTopic(topic, currentLevel);
  });
});

// Search / Explain Button
btnExplain.addEventListener("click", () => {
  if (topicInput.value.trim()) {
    loadTopic(topicInput.value.trim(), currentLevel);
  }
});

topicInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && topicInput.value.trim()) {
    loadTopic(topicInput.value.trim(), currentLevel);
  }
});

// Native Browser Text-to-Speech (TTS)
const btnListen = document.getElementById("btn-listen");
const listenText = document.getElementById("listen-text");

btnListen.addEventListener("click", () => {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    listenText.textContent = "Listen (TTS)";
    btnListen.classList.remove("bg-sky-100", "text-sky-700");
    return;
  }

  const title = document.getElementById("res-title").textContent;
  const tldr = document.getElementById("res-tldr").textContent;
  const analogy = document.getElementById("res-analogy").textContent;
  const speechText = `${title}. Core idea: ${tldr}. Analogy: ${analogy}`;

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    isSpeaking = false;
    listenText.textContent = "Listen (TTS)";
    btnListen.classList.remove("bg-sky-100", "text-sky-700");
  };

  window.speechSynthesis.speak(utterance);
  isSpeaking = true;
  listenText.textContent = "Pause Audio";
  btnListen.classList.add("bg-sky-100", "text-sky-700");
});

// Settings Modal & API Config
const btnSettings = document.getElementById("btn-settings");
const settingsModal = document.getElementById("settings-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnSaveSettings = document.getElementById("btn-save-settings");
const modeDemoBtn = document.getElementById("mode-demo");
const modeApiBtn = document.getElementById("mode-api");
const apiKeyContainer = document.getElementById("api-key-container");
const geminiKeyInput = document.getElementById("gemini-key-input");
const currentModeLabel = document.getElementById("current-mode-label");

btnSettings.addEventListener("click", () => settingsModal.classList.remove("hidden"));
btnCloseModal.addEventListener("click", () => settingsModal.classList.add("hidden"));
btnSaveSettings.addEventListener("click", () => {
  geminiApiKey = geminiKeyInput.value.trim();
  settingsModal.classList.add("hidden");
});

modeDemoBtn.addEventListener("click", () => {
  currentMode = "demo";
  modeDemoBtn.className = "p-3 text-left rounded-xl border-2 border-sky-600 bg-sky-50 text-sky-900 font-medium text-xs";
  modeApiBtn.className = "p-3 text-left rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs";
  apiKeyContainer.classList.add("hidden");
  currentModeLabel.textContent = "Smart Demo";
});

modeApiBtn.addEventListener("click", () => {
  currentMode = "api";
  modeApiBtn.className = "p-3 text-left rounded-xl border-2 border-sky-600 bg-sky-50 text-sky-900 font-medium text-xs";
  modeDemoBtn.className = "p-3 text-left rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs";
  apiKeyContainer.classList.remove("hidden");
  currentModeLabel.textContent = "Live Gemini API";
});

function safeLucide() {
  if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch(e) {}
  }
}

// Initial boot
document.addEventListener("DOMContentLoaded", () => {
  safeLucide();
  loadTopic("Quantum Superposition", "eli5");
});
