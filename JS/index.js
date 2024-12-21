const wordsData = {
  nouns: [
    "apple",
    "book",
    "chair",
    "desk",
    "phone",
    "window",
    "light",
    "pen",
    "table",
    "house",
    "tree",
    "cloud",
    "road",
    "water",
    "coffee",
    "street",
    "music",
    "car",
    "key",
    "time",
    "night",
    "day",
    "shirt",
    "shoe",
    "clock",
    "star",
    "watch",
    "bird",
    "cat",
    "dog",
    "ball",
    "game",
    "food",
    "drink",
    "party",
    "team",
    "work",
    "peace",
    "love",
    "friend",
    "family",
    "job",
    "school",
    "study",
    "class",
    "desk",
    "teacher",
    "student",
    "mountain",
    "ocean",
    "river",
    "forest",
    "sky",
    "sun",
    "moon",
    "planet",
    "computer",
    "television",
    "camera",
    "bottle",
    "cup",
    "lamp",
    "blanket",
    "keychain",
    "glove",
    "shoe",
    "sand",
    "earth",
    "soda",
    "dream",
    "idea",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
  ],
  adjectives: [
    "happy",
    "sad",
    "bright",
    "dark",
    "big",
    "small",
    "fast",
    "slow",
    "good",
    "bad",
    "beautiful",
    "ugly",
    "clean",
    "dirty",
    "soft",
    "hard",
    "loud",
    "quiet",
    "long",
    "short",
    "young",
    "old",
    "easy",
    "difficult",
    "new",
    "old",
    "warm",
    "cold",
    "rich",
    "poor",
    "strong",
    "weak",
    "funny",
    "serious",
    "angry",
    "excited",
    "fearful",
    "nervous",
    "brave",
    "sleepy",
    "cheerful",
    "peaceful",
    "shiny",
    "wet",
    "dry",
    "thin",
    "thick",
    "sweet",
    "sour",
    "salty",
    "spicy",
    "smooth",
    "rough",
    "fuzzy",
    "delicate",
    "harsh",
    "friendly",
    "shy",
  ],
  verbs: [
    "run",
    "jump",
    "eat",
    "sleep",
    "read",
    "write",
    "talk",
    "listen",
    "play",
    "work",
    "study",
    "sing",
    "dance",
    "speak",
    "think",
    "build",
    "make",
    "watch",
    "call",
    "help",
    "clean",
    "drive",
    "walk",
    "draw",
    "cook",
    "learn",
    "teach",
    "open",
    "close",
    "sit",
    "stand",
    "throw",
    "catch",
    "push",
    "pull",
    "laugh",
    "cry",
    "love",
    "hate",
    "kiss",
    "hug",
    "embrace",
    "attack",
    "defend",
    "buy",
    "sell",
    "share",
    "organize",
    "decorate",
    "create",
    "discover",
    "explore",
    "sing",
    "jump",
    "climb",
    "swim",
    "ski",
    "fly",
    "cook",
    "bake",
    "build",
    "help",
    "question",
    "agree",
    "disagree",
    "investigate",
    "lead",
    "follow",
    "succeed",
    "fail",
  ],
};

const nouns = wordsData.nouns;
const adjectives = wordsData.adjectives;
const verbs = wordsData.verbs;
const words = [...nouns, ...adjectives, ...verbs];
const wordsCount = words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

function addClass(el, name) {
  el.className += " " + name;
}
function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}

function randomWord() {
  const randomIndex = Math.ceil(Math.random() * wordsCount);
  return words[randomIndex - 1];
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span></div>`;
}

function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 100; i++) {
    document.getElementById("words").innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  document.getElementById("info").innerHTML = gameTime / 1000 + "";
  window.timer = null;
}

function getWpm() {
  const words = [...document.querySelectorAll(".word")];
  const lastTypedWord = document.querySelector(".word.current");
  const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
  const typedWords = words.slice(0, lastTypedWordIndex);
  const correctWords = typedWords.filter((word) => {
    const letters = [...word.children];
    const incorrectLetters = letters.filter((letter) =>
      letter.className.includes("incorrect")
    );
    const correctLetters = letters.filter((letter) =>
      letter.className.includes("correct")
    );
    return (
      incorrectLetters.length === 0 && correctLetters.length === letters.length
    );
  });
  return (correctWords.length / gameTime) * 60000;
}

function gameOver() {
  clearInterval(window.timer);
  addClass(document.getElementById("game"), "over");
  const result = getWpm();
  document.getElementById("info").innerHTML = `WPM: ${result}`;
}

document.getElementById("game").addEventListener("keyup", (ev) => {
  const key = ev.key;
  const currentWord = document.querySelector(".word.current");
  const currentLetter = document.querySelector(".letter.current");
  const expected = currentLetter?.innerHTML || " ";
  const isLetter = key.length === 1 && key !== " ";
  const isSpace = key === " ";
  const isBackspace = key === "Backspace";
  const isFirstLetter = currentLetter === currentWord.firstChild;

  if (document.querySelector("#game.over")) {
    return;
  }

  if (!window.timer && isLetter) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = new Date().getTime();
      }
      const currentTime = new Date().getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = Math.round(gameTime / 1000 - sPassed);
      if (sLeft <= 0) {
        gameOver();
        return;
      }
      document.getElementById("info").innerHTML = sLeft + "";
    }, 1000);
  }

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, "current");
      }
    } else {
      const incorrectLetter = document.createElement("span");
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = "letter incorrect extra";
      currentWord.appendChild(incorrectLetter);
    }
  }

  if (isSpace) {
    if (expected !== " ") {
      const lettersToInvalidate = [
        ...document.querySelectorAll(".word.current .letter:not(.correct)"),
      ];
      lettersToInvalidate.forEach((letter) => {
        addClass(letter, "incorrect");
      });
    }
    removeClass(currentWord, "current");
    addClass(currentWord.nextSibling, "current");
    if (currentLetter) {
      removeClass(currentLetter, "current");
    }
    addClass(currentWord.nextSibling.firstChild, "current");
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      removeClass(currentWord, "current");
      addClass(currentWord.previousSibling, "current");
      removeClass(currentLetter, "current");
      addClass(currentWord.previousSibling.lastChild, "current");
      removeClass(currentWord.previousSibling.lastChild, "incorrect");
      removeClass(currentWord.previousSibling.lastChild, "correct");
    }
    if (currentLetter && !isFirstLetter) {
      removeClass(currentLetter, "current");
      addClass(currentLetter.previousSibling, "current");
      removeClass(currentLetter.previousSibling, "incorrect");
      removeClass(currentLetter.previousSibling, "correct");
    }
    if (!currentLetter) {
      addClass(currentWord.lastChild, "current");
      removeClass(currentWord.lastChild, "incorrect");
      removeClass(currentWord.lastChild, "correct");
    }
  }

  const wordsContainer = document.getElementById("words");
  const wordsContainerTop = wordsContainer.getBoundingClientRect().top;
  const currentWordTop = currentWord.getBoundingClientRect().top;

  if (currentWordTop > wordsContainerTop + wordsContainer.offsetHeight - 50) {
    const margin = parseInt(wordsContainer.style.marginTop || "0px");
    wordsContainer.style.marginTop = margin - 35 + "px";
  }

  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const cursor = document.getElementById("cursor");
  cursor.style.top =
    (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
  cursor.style.left =
    (nextLetter || nextWord).getBoundingClientRect()[
      nextLetter ? "left" : "right"
    ] + "px";
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  clearInterval(window.timer);
  window.timer = null;
  window.gameStart = null;
  window.pauseTime = 0;

  const gameElement = document.getElementById("game");
  removeClass(gameElement, "over");

  newGame();
});

newGame();
