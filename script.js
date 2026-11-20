const savedWordPairs = localStorage.getItem("wordPairs");
const wordPairs = savedWordPairs === null ? [] : JSON.parse(savedWordPairs);
const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english");
const germanInput = document.getElementById("german");
const wordList = document.getElementById("word-list");
const startPracticeButton = document.getElementById("start-practice");
const nextCardButton = document.getElementById("next-card");
const knewItButton = document.getElementById("knew-it");
const knewItCount = document.getElementById("knew-it-count");
const practiceCard = document.getElementById("practice-card");
let currentPracticePair = null;
let isGermanRevealed = false;
let knownCardCount = 0;

// Increases the number of cards marked as known this session.
function markCardAsKnown() {
  knownCardCount++;
  knewItCount.textContent = knownCardCount;
}

// Rebuilds the list from all word pairs in memory.
function renderList() {
  wordList.innerHTML = "";

  for (let index = 0; index < wordPairs.length; index++) {
    const pair = wordPairs[index];
    const listItem = document.createElement("li");
    listItem.textContent = `${pair.en} – ${pair.de}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteWordPair(index));
    listItem.appendChild(deleteButton);

    wordList.appendChild(listItem);
  }
}

// Removes a word pair, saves the updated list, and renders it again.
function deleteWordPair(index) {
  wordPairs.splice(index, 1);
  localStorage.setItem("wordPairs", JSON.stringify(wordPairs));
  renderList();
}

// Adds a valid English–German pair and clears the form.
function addWordPair(event) {
  event.preventDefault();

  const en = englishInput.value.trim();
  const de = germanInput.value.trim();

  if (en === "" || de === "") {
    return;
  }

  wordPairs.push({ en, de });
  localStorage.setItem("wordPairs", JSON.stringify(wordPairs));
  renderList();
  wordForm.reset();
}

// Shows the English word from the first saved pair.
function showFirstEnglishWord() {
  if (wordPairs.length === 0) {
    return;
  }

  currentPracticePair = wordPairs[0];
  isGermanRevealed = false;
  practiceCard.textContent = currentPracticePair.en;
}

// Shows a random pair other than the current one and hides its translation.
function showNextPracticeWord() {
  if (wordPairs.length === 0) {
    return;
  }

  const currentIndex = wordPairs.indexOf(currentPracticePair);
  let nextIndex = Math.floor(Math.random() * wordPairs.length);
  if (wordPairs.length > 1 && currentIndex !== -1) {
    nextIndex = Math.floor(Math.random() * (wordPairs.length - 1));
    if (nextIndex >= currentIndex) {
      nextIndex++;
    }
  }

  currentPracticePair = wordPairs[nextIndex];
  isGermanRevealed = false;
  practiceCard.textContent = currentPracticePair.en;
}

// Reveals the German translation under the English word.
function revealGermanWord() {
  if (currentPracticePair === null || isGermanRevealed) {
    return;
  }

  const germanWord = document.createElement("div");
  germanWord.textContent = currentPracticePair.de;
  practiceCard.appendChild(germanWord);
  isGermanRevealed = true;
}

wordForm.addEventListener("submit", addWordPair);
startPracticeButton.addEventListener("click", showFirstEnglishWord);
nextCardButton.addEventListener("click", showNextPracticeWord);
knewItButton.addEventListener("click", markCardAsKnown);
practiceCard.addEventListener("click", revealGermanWord);
renderList();