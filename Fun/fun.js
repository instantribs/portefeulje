// Kry die HTML-elemente vanaf die bladsy deur hul ID's te gebruik
const grid = document.getElementById("grid");
const scoreBox = document.getElementById("scoreBox");
const timeBox = document.getElementById("timeBox");

// Kry die knoppies en die ikoon vir speel/pouse
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const restartBtn = document.getElementById("restartBtn");

// ================= Bepaal rooster grootte =================

// Gebruik minder blokkies op selfoon
function getGridSize() {
  return window.innerWidth <= 768 ? 12 : 20;
}

// Hou tred van huidige rooster-grootte
let currentGridSize = getGridSize();

// Stel die speltyd in sekondes
const GAME_TIME = 30;

// Laai die klankeffek vir wanneer 'n lemoen geklik word
const popSound = new Audio("pop.mp3");

// Beginwaarde vir die speler se telling
let score = 0;

// Hou tred van hoeveel tyd oor is
let timeLeft = GAME_TIME;

// Lys wat al die lemoene sal bevat
let oranges = [];

// Veranderlikes om die intervalle van die spel te stoor
let gameInterval = null;
let spawnInterval = null;

// Hou tred of die spel tans speel
let isPlaying = false;

// Hou tred of die spel gepouse is
let isPaused = false;

// Verander die knoppie-ikoon na 'speel'
function setPlayIcon() {
  playPauseIcon.src = "play.png";
  playPauseIcon.alt = "Play";
}

// Verander die knoppie-ikoon na 'pouse'
function setPauseIcon() {
  playPauseIcon.src = "pause.png";
  playPauseIcon.alt = "Pause";
}

// Aktiveer die restart-knoppie
function enableRestart() {
  restartBtn.classList.remove("disabledBtn");
}

// Deaktiveer die restart-knoppie
function disableRestart() {
  restartBtn.classList.add("disabledBtn");
}

// Deaktiveer die speel/pouse-knoppie
function disablePlayButton() {
  playPauseBtn.classList.add("disabledBtn");
}

// Aktiveer die speel/pouse-knoppie
function enablePlayButton() {
  playPauseBtn.classList.remove("disabledBtn");
}

// Skep die spelrooster

function createGrid() {

  // Maak die rooster leeg
  grid.innerHTML = "";

  // Maak die lemoenlys leeg
  oranges = [];

  // Kry die nuutste rooster-grootte
  currentGridSize = getGridSize();

  // Herhaal volgens die rooster se grootte
  for (let i = 0; i < currentGridSize; i++) {

    // Skep 'n nuwe blokkie
    const tile = document.createElement("div");
    tile.classList.add("tile");

    // Skep die lemoen-element
    const orange = document.createElement("div");

    // Voeg klasse by vir styl en versteek dit aanvanklik
    orange.classList.add("orange", "hidden");

    // Skep die beeld vir die lemoen
    const img = document.createElement("img");

    // Stel die beeldbron
    img.src = "orange.jpg";

    // Alternatiewe teks vir die beeld
    img.alt = "Orange";

    // Voeg die beeld binne die lemoen-element
    orange.appendChild(img);

    // Voeg 'n klik-gebeurtenis by die lemoen
    orange.addEventListener("click", () => {

      // Stop as die spel nie speel nie of gepouse is
      if (!isPlaying || isPaused) return;

      // Maak seker die lemoen is sigbaar
      if (!orange.classList.contains("hidden")) {

        // Speel die klankeffek
        popSound.currentTime = 0;
        popSound.play();

        // Voeg 1 punt by die telling
        score++;

        // Wys die nuwe telling op die skerm
        scoreBox.textContent = `Score: ${score}`;

        // Versteek die lemoen nadat dit geklik is
        orange.classList.add("hidden");
      }
    });

    // Voeg die lemoen by die blokkie
    tile.appendChild(orange);

    // Voeg die blokkie by die rooster
    grid.appendChild(tile);

    // Voeg die lemoen by die lys
    oranges.push(orange);
  }
}

// ================= Wys 'n random lemoen =================
function showRandomOrange() {

  // Stop as die spel nie speel nie of gepouse is
  if (!isPlaying || isPaused) return;

  // Kry al die versteekte lemoene
  const hiddenOranges = oranges.filter(o =>
    o.classList.contains("hidden")
  );

  // Stop as daar geen versteekte lemoene is nie
  if (!hiddenOranges.length) return;

  // Kies 'n willekeurige lemoen uit die lys
  const rand =
    hiddenOranges[Math.floor(Math.random() * hiddenOranges.length)];

  // Maak die lemoen sigbaar
  rand.classList.remove("hidden");

  // Versteek die lemoen weer na 800 millisekondes
  setTimeout(() => {
    rand.classList.add("hidden");
  }, 800);
}

// ================= Begin die spel =================
function startGame() {

  // Stop enige ou intervalle
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  // Stel spelstatus
  isPlaying = true;
  isPaused = false;

  // Herstel die telling
  score = 0;

  // Herstel die tyd
  timeLeft = GAME_TIME;

  // Wys die begin-telling
  scoreBox.textContent = `Score: ${score}`;

  // Wys die tyd
  timeBox.textContent = timeLeft;

  // Verander die ikoon na pouse
  setPauseIcon();

  // Aktiveer knoppies
  enableRestart();
  enablePlayButton();

  // Skep die rooster
  createGrid();

  // Wys onmiddellik 'n lemoen
  showRandomOrange();

  // Timer vir die speltyd
  gameInterval = setInterval(() => {

    // Stop tyd as die spel gepouse is
    if (isPaused) return;

    // Verminder tyd met 1 sekonde
    timeLeft--;

    // Wys die nuwe tyd
    timeBox.textContent = timeLeft;

    // Eindig die spel as tyd op is
    if (timeLeft <= 0) {
      endGame();
    }

  }, 1000);

  // Wys elke 600ms 'n nuwe lemoen
  spawnInterval = setInterval(showRandomOrange, 600);
}

// ================= Pause of hervat die spel =================
function togglePause() {

  // Stop as die spel nog nie begin het nie
  if (!isPlaying) return;

  // Wissel tussen gepouse en speel
  isPaused = !isPaused;

  // Verander die ikoon volgens status
  if (isPaused) {
    setPlayIcon();
  } else {
    setPauseIcon();
  }
}

// ================= Eindig die spel =================
function endGame() {

  // Stop al die intervalle
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  // Stel spelstatus terug
  isPlaying = false;
  isPaused = false;

  // Versteek al die lemoene
  oranges.forEach(orange => {
    orange.classList.add("hidden");
  });

  // Wys finale telling
  scoreBox.textContent = `Final Score: ${score}`;

  // Verander ikoon na speel
  setPlayIcon();

  // Deaktiveer speelknoppie
  disablePlayButton();

  // Aktiveer restart-knoppie
  enableRestart();
}

// ================= Pause/play-knoppie =================
playPauseBtn.addEventListener("click", () => {

  // Stop as die knoppie gedeaktiveer is
  if (playPauseBtn.classList.contains("disabledBtn")) {
    return;
  }

  // Begin die spel as dit nog nie speel nie
  if (!isPlaying) {
    startGame();
    return;
  }

  // Anders pouseer of hervat die spel
  togglePause();
});

// ================= Restart-knoppie =================
restartBtn.addEventListener("click", () => {

  // Stop as die knoppie gedeaktiveer is
  if (restartBtn.classList.contains("disabledBtn")) {
    return;
  }

  // Begin die spel weer
  startGame();
});

// ================= Verander rooster by resize =================
window.addEventListener("resize", () => {

  // Kry nuwe rooster-grootte
  const newSize = getGridSize();

  // Verander net as mobiel/desktop verander
  if (newSize !== currentGridSize) {

    // Bou rooster weer
    createGrid();

    // Versteek alle lemoene onmiddellik
    oranges.forEach(orange => {
      orange.classList.add("hidden");
    });
  }
});

// ================= Begin opstelling =================

// Skep die rooster wanneer die bladsy laai
createGrid();

// Stel die begin-telling
scoreBox.textContent = "Score: 0";

// Stel die begin-tyd
timeBox.textContent = GAME_TIME;

// Stel die speel-ikoon
setPlayIcon();

// Deaktiveer restart totdat die spel begin
disableRestart();

// ================= Fun facts =================
// Lys van interessante feite oor lemoene
const orangeFacts = [
  "Oranges are technically a berry.",
  "Brazil grows more oranges than any other country.",
  "Orange trees can live for over 100 years.",
  "One orange contains over 100% of your daily Vitamin C.",
  "There are more than 600 varieties of oranges.",
  "Orange blossoms are the state flower of Florida.",
  "Oranges were originally grown in Southeast Asia.",
  "The color orange was named after the fruit.",
  "Orange trees bloom and produce fruit at the same time.",
  "Sweet oranges account for about 70% of citrus production."
];

// Kry die HTML-element waar feite gewys word
const factElement = document.getElementById("orange-fact");

// Hou tred van watter feit tans gewys word
let currentFact = 0;

// Funksie om feite te verander
function changeFact() {

  // Gaan na die volgende feit
  currentFact++;

  // Begin weer by 0 as al die feite klaar is
  if (currentFact >= orangeFacts.length) {
    currentFact = 0;
  }

  // Maak die teks deursigtig vir fade-effek
  factElement.style.opacity = 0;

  // Wag 300ms voordat die nuwe feit wys
  setTimeout(() => {

    // Verander die teks
    factElement.textContent = orangeFacts[currentFact];

    // Maak die teks weer sigbaar
    factElement.style.opacity = 1;

  }, 300);
}

// Voeg 'n gladde fade-animasie by
factElement.style.transition = "opacity 0.3s ease";

// Verander die feit elke 10 sekondes
setInterval(changeFact, 10000);