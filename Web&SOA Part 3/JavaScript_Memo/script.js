var colors = [];

var guess1 = "";
var guess2 = "";

var count = 0;

var score = 0;
var scoreToWin = 8;

function clickTile(event) {

    var tileContainer = event.target;

    var tile = null;
    for (var i = 0; i < tileContainer.childNodes.length; i++) {
        if (tileContainer.childNodes[i].className == "tile") {
            tile = tileContainer.childNodes[i];
            break;
        }
    }
    if (tile !== null) {

        if ((count < 2) && (tile.classList.contains("face-up") === false)) {

            count++;

            tile.style.display = 'block';
            tile.classList.add("face-up");

            //guess #1
            if (count === 1) {
                guess1 = tile.getAttribute("color");
            }
                //guess #2
            else {
                guess2 = tile.getAttribute("color");

                // since it's the 2nd guess check for match
                if (guess1 === guess2) {
                    console.log("match");

                    score++;

                    var matchedTiles = document.querySelectorAll("[color='" + guess2 + "']");
                    for (var i = 0; i < matchedTiles.length; i++) {
                        matchedTiles[i].classList.add("match");
                    }

                    if (score === scoreToWin) {
                        var board = document.getElementById("board");
                        board.dispatchEvent(new Event('gameWon'));
                    }
                }
                    // else it's a miss
                else {
                    console.log("miss");
                    detachOnClick();

                    setTimeout(function () {
                        var unmatchedTiles = document.querySelectorAll(".tile:not(.match)");
                        for (var i = 0; i < unmatchedTiles.length; i++) {
                            unmatchedTiles[i].classList.remove("face-up");
                            unmatchedTiles[i].style.display = "none";
                        }
                        attachOnClick();
                    }, 1000);
                }

                // reset
                count = 0;
            }
        }
    }
};

function initializeColors() {

    var availableColors = ['#00FFFF', '#000000', '#0000FF', '#FF00FF', '#808080', '#008000', '#00FF00', '#800000',
                           '#000080', '#808000', '#800080', '#FF0000', '#C0C0C0', '#008080', '#FFFFFF', '#FFFF00'];

    for (var i = 0; i < 8; i++) {
        var color = availableColors[i];
        colors.push(color);
        colors.push(color);
    }
}

function randomizeColors() {
    Array.prototype.randomize = function () {
        var i = this.length, j, temp;
        while (--i) {
            j = Math.floor(Math.random() * (i - 1));
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    };
    colors.randomize();
}

function createBoard() {

    var board = "<ol>";
    for (var i = 0; i < 16; i++) {
        board += "<li class='tile-container'>";
        board += "<div class='tile' color='" + colors[i] + "' style='display:none;background-color:" + colors[i] + "'/>";
        board += "</li>";
    }
    board += "</ol>";
    document.getElementById("board").innerHTML = board;
}

function attachOnClick() {

    var board = document.getElementById("board");
    board.style.cursor = "pointer";

    var tileContainers = document.getElementsByClassName("tile-container");
    for (var i = 0; i < tileContainers.length; i++) {
        tileContainers[i].addEventListener('click', clickTile);
    }
}

function detachOnClick() {

    var board = document.getElementById("board");
    board.style.cursor = "no-drop";

    var tileContainers = document.getElementsByClassName("tile-container");
    for (var i = 0; i < tileContainers.length; i++) {
        tileContainers[i].removeEventListener('click', clickTile);
    }
}

function attachGameWon() {

    var board = document.getElementById("board");
    board.addEventListener('gameWon', gameWon)
}

var timerId, ticker, sec, min;
var isGameStarted = true;

function startGame() {

    // reset the timer
    ticker = 0;
    min = 0; sec = 0;
    setTimeout('timer()', 1000);

    // initialize colors, place them in an array
    initializeColors();
    // randomize the order
    randomizeColors();

    // create the board and all its tiles
    createBoard();

    // make tiles clickable
    attachOnClick();

    // end game when all tiles are matched
    attachGameWon();

    document.getElementById('score-table').style.display = 'block';
    document.getElementById('restart').value = 'Stop';

    document.getElementById('win-message').style.display = 'none';

    isGameStarted = true;
}

function stopGame() {

    guess1 = "";
    guess2 = "";

    count = 0;

    // stop the timer
    clearTimeout(timerId);
    document.getElementById('score-value').innerHTML = '';

    // make tiles unclickable
    detachOnClick();

    document.getElementById('score-table').style.display = 'none';
    document.getElementById('restart').value = 'Start';

    isGameStarted = false;
}

function gameWon() {

    document.getElementById('win-message').innerHTML = 'Victory! Time elapsed: ' + min + " min " + sec + " sec";
    document.getElementById('win-message').style.display = 'block';

    stopGame();
}

function restartGame() {

    if (isGameStarted) {
        stopGame();
    }
    else {
        startGame();
    }
}

function timer() {

    min = Math.floor(ticker / 60);
    sec = (ticker - (min * 60)) + '';

    if (sec.length == 1) { sec = "0" + sec };
    ticker++;
    document.getElementById('score-value').innerHTML = min + " min " + sec + " sec";
    timerId = setTimeout('timer()', 1000);
}
