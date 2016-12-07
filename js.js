$(document).ready(function() {
    var openFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var takenp1 = [];
    var takenp2 = [];
    var winScenarios = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    var xPlacement = "<img src='pics/ball-blue.png'></img>";
    var oPlacement = "<img src='pics/ball-red.png'></img>";
    var p1 = xPlacement;
    var p2 = oPlacement;

    function checkForWin(testList) {
        // console.log(testList);
        for (var i = 0; i < winScenarios.length; i++) {
            var compare = winScenarios[i];

            count = 0;
            for (var j = 0; j < compare.length; j++) {
                for (var k = 0; k < testList.length; k++) {
                    if (testList[k] === compare[j]) {
                        count++;
                        if (count === 3) {
                            return true;
                        }
                    }
                }
                // console.log(compare);
            }
        }
        return false;
    }

    function openForPlacement(x) {
        // Is it okay to place an X or O in a square?
        for (var i = 0; i < openFields.length; i++) {
            if (x === openFields[i]) {
                openFields.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function cMoveLogic() {
        cMoveIndex = Math.floor(Math.random() * openFields.length);
        cMove = openFields[cMoveIndex];
        takenp2.push(cMove);
        openFields.splice(cMoveIndex, 1);

        // $('#takenByP2').text("Computer: " + takenp2);
        // $('#' + cMove).text(p2);

        setTimeout(function() {
            $('#' + cMove).html(p2);
        }, 250);
    }

    function resetGame() {
        openFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        takenp1 = [];
        takenp2 = [];
        for (var i = 1; i < 10; i++) {
            $("#" + i).empty();
        }
        $('#status').empty();
        $('#open').empty();
        $('#takenByP1').empty();
        $('#takenByP2').empty();
    }

    function turn(p1Move) {
        if (openForPlacement(p1Move) === true) {
            takenp1.push(p1Move);
            // $('#status').text('Square is open for placement.');
            // $('#takenByP1').text("Player:" + takenp1);
            // $("#" + p1Move).text(p1);
            $('#' + p1Move).html(p1);


            if (openFields.length === 0 && checkForWin(takenp1) === false && checkForWin(takenp2) === false) {
                setTimeout(function() {
                    resetGame();
                    showNotice("It's a Tie!!");
                }, 500);
            } else if (checkForWin(takenp1) === true) {
                setTimeout(function() {
                    resetGame();
                    showNotice("You Won!!!");

                }, 500);
            } else {

                cMoveLogic();
                if (checkForWin(takenp2) === true) {
                    setTimeout(function() {
                        resetGame();
                        showNotice("The Computer Won.");
                    }, 500);
                }
            }

            // $('#open').text("Open: " + openFields);
        }
    }

    $('#changexo').click(function() {
        if (p1 === xPlacement) {
            p1 = oPlacement;
            p2 = xPlacement;

        } else if (p1 === oPlacement) {
            p1 = xPlacement;
            p2 = oPlacement;
        }
        resetGame();
        if (p1 === xPlacement) {
            $("#xostatus").text("You are currently playing as blue. ");
        } else {
            $("#xostatus").text("You are currently playing as red. ");

        }


    });

    function showNotice(x) {

        $('#notices').html('<img class="splash" src="pics/bg-santa.jpg"><p class="splashtxt">' + x + '</p>');
        $('#notices').height('100%');
        $('#notices').width('100%');
    }

    $("#xostatus").text("You are currently playing as blue.");

    $('#1').click(function() {
        turn(1);
        // $('#1').text(xPlacement);
    });
    $('#2').click(function() {
        turn(2);
    });
    $('#3').click(function() {
        turn(3);
    });
    $('#4').click(function() {
        turn(4);
    });
    $('#5').click(function() {
        turn(5);
    });
    $('#6').click(function() {
        turn(6);
    });
    $('#7').click(function() {
        turn(7);
    });
    $('#8').click(function() {
        turn(8);
    });
    $('#9').click(function() {
        turn(9);
    });
    $('#notices').click(function() {
        $('#notices').empty();
        $('#notices').height(0);
        $('#notices').width(0);
    });
});
