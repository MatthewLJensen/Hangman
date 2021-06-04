var secretWord;
var lettersGuessed;
var lettersFailed;

document.addEventListener('keydown', function (event) {
    console.log();
    if (document.activeElement.id != "secret_word" && event.keyCode > 64 && event.keyCode < 91) {
        placeLetter(String.fromCharCode(event.keyCode));
    }
});

function onLoad() {
	var letterTemplate = document.querySelector("#letterTemplate");
    var lettersDiv = document.querySelector("#letters");
    lettersDiv.innerHTML = "";
    for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        var letterButton = letterTemplate.cloneNode(true);
		letterButton.disabled = true;
        letterButton.innerText = letter;
        letterButton.id = letter + "_button";
        letterButton.classList.remove("template");
        lettersDiv.appendChild(letterButton);
    }
	
	var secret_word_input = document.querySelector("#secret_word");
    var secret_word_input_label = document.querySelector("#secret_word_input_label");
    var start_button = document.querySelector("#start_button");
}

function restartGame(){
	var letterTemplate = document.querySelector("#letterTemplate");
    var lettersDiv = document.querySelector("#letters");
    lettersDiv.innerHTML = "";
    for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        var letterButton = letterTemplate.cloneNode(true);
		letterButton.disabled = true;
        letterButton.innerText = letter;
        letterButton.id = letter + "_button";
        letterButton.classList.remove("template");
        lettersDiv.appendChild(letterButton);
    }
	
	
    
    
	
	var blanks = document.querySelector("#blanks");
	blanks.innerHTML = ""; /* This removes the blanks */

	var secret_word_input = document.querySelector("#secret_word");
	secret_word_input.style.visibility = "visible"; /* This makes the input word box visible */
	secret_word_input.value = "";/* This resets the input word value */
	
	var secret_word_input_label = document.querySelector("#secret_word_input_label");
    secret_word_input_label.style.visibility = "visible";
	
	var start_button = document.querySelector("#start_button"); 
    start_button.innerText = "Start";

    lettersGuessed = 0;
    lettersFailed = 0;

	var image = document.getElementById("gallows")
    image.src = "./images/0.png";
}

function startGame() {
    var words = ["short", "hangman", "banana", "computer", "headphones", "refrigerator", "sunglasses", "mississippi", "catapult", "challenge", "monitor", "water", "plug", "juice", "trebuchet", "clock", "stopwatch", "security", "abacus", "calculator", "shoes", "socks", "shirt", "glove", "baseball", "softball", "badminton", "hockey", "basketball", "soccer", "football", "ethernet", "laptop", "zipper"];

    var secret_word_input = document.querySelector("#secret_word");
    var secret_word_input_label = document.querySelector("#secret_word_input_label");
    var start_button = document.querySelector("#start_button");

    var game_state = document.getElementById("game_state");
    game_state.innerText = "";

	for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
			button = document.querySelector("#" + letter + "_button");
			button.disabled = false;
    }
	
    if (start_button.innerText == "Start") {

        secretWord = secret_word_input.value.toUpperCase();
        
        if (secretWord.includes(" ")) {
            alert("No spaces are allowed in the secret word.");
            return;
        }
        if (secretWord == "") {
            secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        }

        secret_word_input.style.visibility = "hidden";
        secret_word_input_label.style.visibility = "hidden";
        start_button.innerText = "Restart";

        lettersGuessed = 0;
        lettersFailed = 0;

        var blankTemplate = document.querySelector(".template#blankTemplate");
        var blanksDiv = document.querySelector("#blanks");

        var image = document.getElementById("gallows")
            image.src = "./images/0.png";

        blanksDiv.innerHTML = "";
        for (letter of secretWord) {
            var blank = blankTemplate.cloneNode(true);
            blank.classList.remove("template");
            blanksDiv.appendChild(blank);
            blanksDiv.appendChild(document.createTextNode(" "));
        }


    } else {
        var con = confirm("Are you sure you want to restart?");
        if (con) {
			restartGame();
        }
    }
}

function placeLetter(letter) {
    correctGuess = false;

    button = document.querySelector("#" + letter + "_button");
    letter = button.innerText.toUpperCase();

    if (button.disabled) {
        console.log(`The letter ${letter} has already been guessed. Moving on...`);
        return;
    } else {
        console.log(`Placing ${letter}`);
    }

    button.disabled = true;

    var blanks = document.querySelector("#blanks").children;
    var image = document.getElementById("gallows");
    var game_state = document.getElementById("game_state");
    var start_button = document.querySelector("#start_button");

    for (var pos = 0; pos < blanks.length; pos++) {
        if (secretWord[pos] == letter && blanks[pos].innerHTML == "_") {
            blanks[pos].innerHTML = letter;
            lettersGuessed++;
            correctGuess = true;
            button.style.color = "green";
        }
    }

    if (!correctGuess) {
        if (lettersFailed == 5) {
            game_state.innerText = "You lose.";
            game_state.style.color = "red";
			disable_buttons();
        }
        console.log("Wrong guess, adding to body");
        lettersFailed += 1;
        image.src = "./images/" + lettersFailed + ".png";
        button.style.color = "red";
    }

    if (lettersGuessed == secretWord.length) {
        game_state.innerText = "You win!";
        game_state.style.color = "green";
        start_button.innerText = "Restart?"
		disable_buttons();
    }
}

function disable_buttons(){
	for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
		/*console.log("disabling " + letter);*/
		disable_button = document.querySelector("#" + letter + "_button");
		if (disable_button.disabled == false){
			disable_button.disabled = true;
		}
	}	
}

