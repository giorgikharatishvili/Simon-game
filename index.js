var gamestarted = false;
var level = 1;
var memory = [];
var press = [];
var butonColors = ["green", "red", "yellow", "blue"];
var buttonPress = 0;


$(document).on("keypress", function() {
    if (!gamestarted) {
        gamestarted = true;
        gameStarted();
    }
});

function gameStarted(){
    console.log('what');
    $("h1").text("level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = butonColors[randomNumber];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    memory.push(randomChosenColour);
    press = [];
    buttonPress = 0;
    $(".btn").off("click").on("click", function() {
        var color = $(this).attr("id");
        console.log(memory[buttonPress], color)
        if (memory[buttonPress] === color){
            buttonPress++;
            playSound(color);
            playerClickedColor(color);
        } else {
            playSound('wrong');
            gameOver();
        }
    });
}

function playerClickedColor(color) {
    press.push(color);

    if (press.length === memory.length) {
        checkSequence();
    }
}
    

function checkSequence() {
        if (colorsAreEqual(press, memory)) {
            setTimeout(function() {
                level++;
                gameStarted();
            }, 1000);
        } else {
            gameOver();
        }
}
function playSound(color) {
    var obj = document.createElement('audio');
    obj.src = 'sounds/' + color + '.mp3'; 
    obj.play(); 
}

function gameOver() {
    $("body").css("background-color", "red");
    $("h1").text("You lost");
    setTimeout(function() {
        resetGame();
        location.reload();
    }, 5000);
}

function resetGame() {
    level = 1;
    memory = [];
    press = [];
    gamestarted = false; 
}

function colorsAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
    }

    return true;

}