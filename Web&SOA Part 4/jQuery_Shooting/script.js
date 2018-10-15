(function () {

    var totalScore = 0;
    var scoreToWin = 100;

    var shots = 0;

    var numberOfArrows = 5;

    var isGameStopped = true;

    var shoot = (function (event) {

        // prevents the event from bubbling up the DOM tree
        event.stopPropagation();

        if (numberOfArrows == 0) {
            $('#reload-message').show();
        }
        else {
            shots++;
            numberOfArrows--;

            var score = $(this).attr('score');

            totalScore += parseInt(score);

            $('#score-value').text(score);
            $('#total-score-value').text(totalScore);
            $('#arrows-value').text(numberOfArrows);

            if(totalScore >= scoreToWin){
                $(document).trigger("gameWon");
            }
        }
    });

    var reload = (function () {
        if (!isGameStopped) {
            numberOfArrows++;
            $('#arrows-value').text(numberOfArrows);

            if ($('#reload-message').css('display') !== 'none') {
                $('#reload-message').hide();
            }
        }
    });

    var startGame = (function () {
        isGameStopped = false;
        $("#stop-start").attr('value', "Stop");

        $('#win-message').hide();

        // ex 2
        // DOES NOT WORK BECAUSE 'this' inside of shoot() is undefined
        /*$('.wa').on('click', fuction(event){
            shoot(event);
        });*/
        $('.wa').on('click', shoot);
    });

    var stopGame = (function () {
        $(".wa, .container").off('click');

        isGameStopped = true;
        $("#stop-start").attr('value', "Start");

        resetScore();
    });

    var resetScore = (function () {
        totalScore = 0;
        numberOfArrows = 5;
        shots = 0;

        $('#score-value').text(0);
        $('#total-score-value').text(totalScore);
        $('#arrows-value').text(numberOfArrows);
    });

    // ex 1
    $('#stop-start').click(function(){
        if(isGameStopped){
            startGame();
        }else{
            stopGame();
        }
    });

    // ex 3
    $('#reset-score').bind('click', resetScore);

    // ex 4
    $('.container').hover(
        function(){
            $(this).css("cursor", (isGameStopped)?"no-drop":"crosshair");
        },
        function(){ $(this).css("cursor", "auto"); }
    );

    // ex 5
    $(document).on("keydown", function(event){
        if ( event.which === 82 ) {
           reload();
        }
    });

    // ex 6
    $(document).on("gameWon", function(){
        var winMsg = "Congratulations, your score was "+totalScore+" with "+shots+" shots!"
        $("#win-message").show().text(winMsg);
        stopGame();
    });

}.call(this));
