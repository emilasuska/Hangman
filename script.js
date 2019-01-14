var word;
var guesses;
var guessedLetters;

function startGame() {
    // pick a random word
    var words = getWords();
    word = words[Math.floor(Math.random() * words.length)].toUpperCase();

    // reset guesses
    guesses = 6;
    guessedLetters = [];

    // update everything
    printGuesses();
    printMessage("");
    showPicture();
    printWord();
    createAlphabet();
}

function guessLetter() {
    // disable the letter button that was just pressed
    this.disabled = "true";

    // check if the letter is in the word
    var letter = this.value;
    if (word.includes(letter)) {
        // yay! got a letter
        guessedLetters.push(letter);
        if (printWord()) {
            // got all letters of the word :)
            win();
        }
    } else {
        // letter not in the word :(
        guesses--;
        printGuesses();
        showPicture();
        if (guesses == 0) {
            // no more guesses left :(
            loose();
        }
    }
}

function win() {
    printMessage("You win!");
    disableAlphabet();
}

function loose() {
    printMessage("You lost! Try again!");
    printWord();
    disableAlphabet();
}

function printGuesses() {
    document.getElementById("guesses").innerText = guesses;
}

function printMessage(text) {
    document.getElementById("message").innerText = text;
}

function printWord() {
    var uncoveredWord = "";

    // loop over all the letters of the word
    for (var i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            // this letter has been guessed - show it
            uncoveredWord += word[i];
        } else if (guesses == 0) {
            // end of game – show the missing letter in red
            uncoveredWord += '<span class="missingLetter">' + word[i] + '</span>';
        } else {
            // letter has not been guessed
            uncoveredWord += "_";
        }
    }

    document.getElementById("word").innerHTML = uncoveredWord;

    // return whether entire word has been guessed
    return uncoveredWord == word;
}

function showPicture() {
    // show image corresponding to remaining guesses
    document.getElementById("picture").src = "img/hangman" + guesses + ".svg";
}

function createAlphabet() {
    var alphabet = document.getElementById("alphabet");

    // remove any existing buttons
    alphabet.innerHTML = "";

    // create buttons for every letter in the alphabet
    for (var i = 0; i < 26; i++) {
        var button = document.createElement("input");
        button.value = String.fromCharCode("A".charCodeAt(0) + i);
        button.type = "button";
        button.className = "w3-button w3-circle w3-teal";
        button.onclick = guessLetter;
        alphabet.appendChild(button);
    }

    // split into two rows
    var br = document.createElement("br");
    alphabet.insertBefore(br, alphabet.children[13]);
}

function disableAlphabet() {
    var alphabet = document.getElementById("alphabet");

    // disable all alphabet buttons
    for (var i = 0; i < alphabet.children.length; i++) {
        alphabet.children[i].disabled = "true";
    }
}

function getWords() {
    var wordsByDifficultyAndCategory = {
        easy: {
            countries: [
                "Canada", "France", "China", "Mexico", "Brazil", "Japan", "Spain", "England", "Russia", "Italy",
                "Germany", "Greece", "Turkey", "Australia", "Poland", "Thailand", "Colombia", "Egypt", "Vietnam",
                "Bolivia", "Venezuela"
            ],

            vegetables: [
                "Broccoli", "Cucumber", "Spinach", "Peas", "Pepper", "Potato", "Beans", "Corn", "Carrots", "Lettuce",
                "Mushroom", "Onion"

            ],

            occupations: [
                "Doctor", "Baker", "Waiter", "Librarian", "Dentist", "Chef", "Actor", "Pilot", "Teacher", "Accountant",
                "Architect", "Activist", "Miner", "Plumber", "Engineer", "Hairdresser"
            ],
        },
        medium: {
            countries: [
                "Argentina", "Chile", "Peru", "Ecuador", "Iceland", "Norway", "Sweden", "Portugal", "Ireland", "Norway",
                "Denmark", "Finland", "Austria", "Ukraine", "Croatia", "Netherlands", "Philippines", "Indonesia",
                "Singapore", "Serbia", "Morocco", "Taiwan"
            ],

            vegetables: [
                "Beets", "Cabbage", "Eggplant", "Ginger", "Cauliflower", "Celery", "Asparagus", "Radish", "Kale"
            ],

            occupations: [
                "Chemist", "Locksmith", "Mathematician", "Miner", "Musician", "Plumber", "Therapist",
                "Waiter", "Economist", "Lifeguard", "Therapist", "Journalist", "Musician"
            ],
        },
        hard: {
            countries: [
                "Uruguay", "Algeria", "Senegal", "Slovakia", "Bulgaria", "Israel", "Pakistan", "Bulgaria", "Ethiopia",
                "Somalia", "Zimbabwe", "Yemen", "Oman", "Bangladesh", "Mongolia", "Afghanistan", "Kazakhstan",
                "Georgia", "Lithuania", "Latvia", "Estonia", "Kenya"
            ],

            vegetables: [
                "Artichoke", "Arugula", "Edamame", "Fennel","Leek", "Parsnip", "Pumpkin", "Shallots", "Squash",
                "Turnip", "Yam", "Zucchini"
            ],

            occupations: [
                "Acupuncturist", "Chiropractor", "Dermatologist", "Barista", "Carpenter", "Optometrist", "Physicist",
                "Mathematician", "Electrician", "Florist", "Locksmith"
            ],
        }
    };
    var difficulty = document.getElementById("difficulty").value;
    var category = document.getElementById("category").value;
    return wordsByDifficultyAndCategory[difficulty][category];
}
