$(document).ready(function () {
    $('#welcomeModal').modal('show');

    let grades = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00];
    let theGrade = Math.floor(Math.random() * grades.length);

    let attempts = 0;
    let maxAttempts = 3;

    // Disable guess input and button initially
    $('#guessInput').prop('disabled', true);
    $('#guessBtn').prop('disabled', true);

    $('#subjectBtn').click(function () {
        let subject = document.getElementById("subjectInput").value.trim();
        let paragraph = document.getElementById("subjectParagraph");

        if (subject === "") {
            alert("Please enter a subject first.");
            return;
        }

        paragraph.textContent = `Guess your grade in ${subject}:`;

        // Enable guessing after subject is entered
        $('#guessInput').prop('disabled', false);
        $('#guessBtn').prop('disabled', false);
        $('#guessInput').focus();
    });

    $('#guessBtn').click(function () {
        attempts++;

        let guessInput = document.querySelector("#guessInput");
        let guess = parseFloat(guessInput.value);
        let subject = document.getElementById("subjectInput").value;

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
            showResultModal("Congratulations!", `🎉 You passed in ${subject}! Best of luck to your next semester.`);
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
                showResultModal("Game Over!", `😭 Unfortunately, you failed in ${subject}. See you next semester.`);
            }
            $('#result').text("Game Over!");
            guessInput.disabled = true;
            $('#guessBtn').prop('disabled', true);
        }

        guessInput.value = "";
        guessInput.focus();
    });

    $('#instructionBtn').click(function () {
        $('#instructionModal').modal('show');
    });

    $('#newGameModal #newGameBtn').click(function () {
        resetGame();
    });

    function showInstructionModal() {
        $('#instructionModal').modal('show');
    }

    function showResultModal(title, message) {
        $('#newGameModalTitle').text(title);
        $('#newGameModal .modal-body').text(message);
        $('#newGameModal').modal('show');
    }

    function resetGame() {
        attempts = 0;
        theGrade = Math.floor(Math.random() * grades.length);
        document.getElementById("grade").innerHTML = '#';
        $('#subjectInput').focus().val('');
        $('#subjectParagraph').text("Guess your grade:");
        $('#grade').removeClass('correct-guess wrong-guess');
        $('#attempts').find('.attempt').remove();
        $('#result').text("Good Luck!");
        $('#guessInput').prop('disabled', true).val('');
        $('#guessBtn').prop('disabled', true);
        $('#instructions').hide();
        $('#instructionBtn').text("Show Instructions");
    }

    $('#welcomeModal').on('hidden.bs.modal', function () {
        $('#guessInput').focus();
    });

});
