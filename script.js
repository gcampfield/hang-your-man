if (window.location.hash == "#p" || window.location.hash == "#prom") {
    var word = "PROM?"
    $(".win button").hide();
    $("<p></p>")
        .text("Now will you go to prom with me?")
        .css({
            "font-size": "32px",
            "color": "#2ecc71"
        })
        .appendTo(".win .screen_wrap");
} else {
    var word = randomWord().toUpperCase();
}

var guess_word = new Array(word.length + 1).join('_').split(''),
    strikes_left = 6,
    letters_left = word.length,
    limbs = ["lleg", "rleg", "larm", "rarm", "torso", "head"],
    guessed_letters = [],
    isOver = false;

function setLetters(guess) {
    var guess_html = "";
    for (var i = 0; i < guess.length; i++) {
        if (guess[i] == " " || guess[i] == "." || guess[i] == "," || guess[i] == "!" || guess[i] == "?") {
            guess_html += "<span class=\"noline\">" + guess[i] + "</span>";
        } else if (guess[i] == "_") {
            guess_html += "<span></span>";
        } else {
            guess_html += "<span>" + guess[i] + "</span>";
        }
    }
    $(".text_state .letters").html("\n" + guess_html + "\n");
}

function addGuessedLetter(letter, found) {
    if (found) {
        $("<span class=\"found\">" + letter + "</span>").appendTo($(".guessed_letters .letters"));
    } else {
        $("<span>" + letter + "</span>").appendTo($(".guessed_letters .letters"));
    }
    guessed_letters += letter;
}

function strike() {
    strikes_left--;

    $(".limb." + limbs[strikes_left]).show();

    if (strikes_left == 0) {
        isOver = true;
        gameOver(win = false);
    }
}

function gameOver(win) {
    if (win) setTimeout(function () { $(".win").fadeIn() }, 500);
    else {
        $(".word").html(word);
        setTimeout(function () { $(".lose").fadeIn() }, 500);
    }
}

//$("input[name=\"guess\"]").keyup(function () {
//    var letter = $(this).val();
//    if (letter.search(/[A-z]/) == -1) {
//        $(this).val("");
//    } else if (letter.search(/[A-Z]/) == -1) {
//        $(this).val(letter.toUpperCase());
//    }
//});

function guess(letter) {
    for (var i = 0; i < guessed_letters.length; i++) {
        if (guessed_letters[i] == letter) return;
    }

    found = false;
    for (var i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            if (guess_word[i] != letter) {
                guess_word[i] = letter;
                found = true;
                letters_left--;
            }
        }
    }

    addGuessedLetter(letter, found);

    if (found) {
        setLetters(guess_word);
        if (letters_left == 0) {
            isOver = true;
            gameOver(win = true);
        }
    } else strike();
}

function fillSequence(letters) {
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; j < letters.length; j++) {
            if (letters[j] == word[i]) {
                guess_word[i] = letters[j];
                letters_left--;
                break;
            }
        }
    }
}

$(".guess").submit(function () {
    if (isOver) return false;

    var found = false;
    var letter = $(".guess_input").val().toUpperCase();
    if (letter.match(/[A-z]/))
        guess(letter);
    $(".guess_input").val("");

    return false; // Stop refresh
});

(function () {
    fillSequence(" .,!?");
    // $(".strikes .num").html(strikes_left);
    setLetters(guess_word);
    // gameOver(win = true);
})();