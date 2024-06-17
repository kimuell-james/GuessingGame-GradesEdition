$(document).ready(function() {
    $('#welcomeModal').modal('show');

    let grades = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00];
    let theGrade = Math.floor(Math.random() * grades.length);

    let attempts = 0;
    let maxAttempts = 3;

    $('#guessBtn').click(function() {
        attempts++;

        let guessInput = document.querySelector("#guessInput");
        let guess = parseFloat(guessInput.value);

        if (isNaN(guess) || !grades.includes(guess)) {
            $('#result').text("Try again. Enter a valid guess.");
            attempts--;
            guessInput.focus();
            return;
        }

        let attemptItem = document.createElement('div');
        attemptItem.className = 'attempt';

        if (guess === grades[theGrade]) {
            $('#grade').addClass('correct-guess').text(grades[theGrade]);
            guessInput.disabled = true;
            $('#guessBtn').prop('disabled', true);
            $('#result').text("Congratulations!");
            showResultModal("Congratulations!", "You passed! Best of luck to your next semester.");
            return;
        } else {
            if (guess > grades[theGrade]) {
                attemptItem.classList.add('lower-guess');
                $('#result').text("Try higher.");
            } else {
                attemptItem.classList.add('higher-guess');
                $('#result').text("Try lower.");
            }
        }

        attemptItem.textContent = `${guess}`;
        $('#attempts').append(attemptItem);

        //Game Over
        if (attempts >= maxAttempts) {
            if (guess !== grades[theGrade]) {
                $('#grade').addClass('wrong-guess').text(grades[theGrade]);
                showResultModal("Game Over!", "Unfortunately, you failed. See you next semester.");
            }
            $('#result').text("Game Over!");
            guessInput.disabled = true;
            $('#guessBtn').prop('disabled', true);
        }

        guessInput.value = "";
        guessInput.focus();
    });

    $('#instructionBtn').click(function() {
        $('#instructions').toggle();
        let text = $('#instructionBtn').text();
        if (text === "Show Instructions") {
            $('#instructionBtn').text("Hide Instructions");
        } else {
            $('#instructionBtn').text("Show Instructions");
        }
        $('#guessInput').focus();
    });

    $('#newGameModal #newGameBtn').click(function() {
        resetGame();
    });

    function showResultModal(title, message) {
        $('#newGameModalTitle').text(title);
        $('#newGameModal .modal-body').text(message);
        $('#newGameModal').modal('show');
    }

    function resetGame() {
        attempts = 0;
        theGrade = Math.floor(Math.random() * grades.length);
        document.getElementById("grade").innerHTML = '#';
        $('#grade').removeClass('correct-guess wrong-guess');
        $('#attempts').find('.attempt').remove();
        $('#result').text("Good Luck!");
        $('#guessInput').prop('disabled', false).val('');
        $('#guessBtn').prop('disabled', false);
        $('#guessInput').focus();
    }

    $('#welcomeModal').on('hidden.bs.modal', function () {
        $('#guessInput').focus();
    });

});
