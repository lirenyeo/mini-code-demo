const wordGuessContainer = document.getElementById("guessed-word");
const guessedLettersContainer = document.getElementById("guessed-letter");
const newGameButton = document.getElementById("new-game-button");
const guessLetterForm = document.getElementById("guess-form");
const userGuessesLeft = document.getElementById("remaining-guesses");
const wordsToGuess = [
  "banana",
  "pineapple",
  "lemon",
  "apple",
  "orange",
  "pear",
  "peach",
  "coconut",
  "durian"
];
let chosenWord = "";

function initialWordSetup(word) {
  let spaces = word.split("").map(function(letter) {
    return "_";
  });
  wordGuessContainer.innerHTML = spaces.join(" ");
}

function startNewGame() {
  guessLetterForm.classList.remove("d-none");
  wordGuessContainer.innerHTML = "";
  guessedLettersContainer.innerHTML = "";
  guessesRemaining = 10;
  userGuessesLeft.innerHTML = guessesRemaining;
  alreadyGuessed = [];
  chosenWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
  initialWordSetup(chosenWord);
}

newGameButton.onclick = function() {
  startNewGame();
};

//=================================================//
// Everything above is Game Setup, Below is Game Logic
//=================================================//

let guessesRemaining = 10;
const alphabet = /^[A-Za-z]+$/; // Regex to provide letters of alphabet
let alreadyGuessed = [];

function checkWin() {
  let wordGuessState = wordGuessContainer.innerHTML.split(" ").join("");
  if (wordGuessState === chosenWord) {
    alert(`You won! You guessed ${chosenWord} correctly!`);
    startNewGame();
  }
}

function checkValidGuess(input) {
  if (input.match(alphabet) && input.length === 1) {
    if (alreadyGuessed.includes(input)) {
      // Checks if the letter exists in the array
      alert(`You have already used the letter ${input}, pick another!`);
      return false;
    }
    alreadyGuessed.push(input); // Push the valid choice to the array of guessed letters
    return true;
  }
  alert("Invalid guess! Pick a letter a-z!");
  return false;
}

function updateGuessList(letter) {
  let newGuessItem = document.createElement("li");
  newGuessItem.innerHTML = letter;
  guessedLettersContainer.append(newGuessItem);
}

function findInWord(input) {
  let wordCheck = chosenWord.split("");
  let correctGuess = false;
  for (i = 0; i < wordCheck.length; i++) {
    if (input == wordCheck[i]) {
      let updatedWord = wordGuessContainer.innerHTML.split(" ");
      updatedWord[i] = input;
      wordGuessContainer.innerHTML = updatedWord.join(" ");
      correctGuess = true;
    }
  }
  return correctGuess;
}

guessLetterForm.onsubmit = function(event) {
  if (guessesRemaining > 0) {
    // Stop the default page refresh behaviour of submitting form
    event.preventDefault();

    // Capture the letter the user has inputted;
    currentGuess = event.target["0"].value.toLowerCase(); // Always lowercase

    // Update the guessed word on the board as well as keeping track during the game to avoid duplicated guesses
    if (checkValidGuess(currentGuess)) {
      updateGuessList(currentGuess); // Add to letter to list of guesses on display

      if (findInWord(currentGuess)) {
        // If guessed letter is found in word
        checkWin();
      } else {
        guessesRemaining--;
        userGuessesLeft.innerHTML = guessesRemaining;
        if (guessesRemaining === 0) {
          alert(`Game Over! Answer was ${chosenWord}! Try Again!`);
          wordGuessContainer.innerHTML = chosenWord.split("").join(" ");
        }
      }
      guessLetterForm.reset();
    }
  }
};
