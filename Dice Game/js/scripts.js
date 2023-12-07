$(document).ready(() => {
    let playerScore = 0;
    let computerScore = 0;
    let rollCount = 0;

    // Arrays to store dice rolls
    const playerDiceRolls = [];
    const computerDiceRolls = [];

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

// Update dice images
const updateDiceImages = (playerRolls, computerRolls) => {
    for (let i = 0; i < playerRolls.length; i++) {
        const playerDie1Value = playerRolls[i][0];
        const playerDie2Value = playerRolls[i][1];
        const computerDie1Value = computerRolls[i][0];
        const computerDie2Value = computerRolls[i][1];

        // Update player dice images
        $(`#player-die-1-${i}`).attr("src", `../resources/images/dice-six-faces-${playerDie1Value}.svg`);
        $(`#player-die-2-${i}`).attr("src", `../resources/images/dice-six-faces-${playerDie2Value}.svg`);

        // Update computer dice images
        $(`#computer-die-1-${i}`).attr("src", `../resources/images/dice-six-faces-${computerDie1Value}.svg`);
        $(`#computer-die-2-${i}`).attr("src", `../resources/images/dice-six-faces-${computerDie2Value}.svg`);
    }
};


    // Calculate rolls
const calculateScore = (die1, die2) => {
    if (die1 === 1 || die2 === 1) {
        return 0;
    } else if (die1 === die2) {
        return (die1 + die2) * 2;
    } else {
        return die1 + die2;
    }
};

// Update score
const updateScore = () => {
    playerScore = 0;
    computerScore = 0;

    for (let i = 0; i < playerDiceRolls.length; i++) {
        const playerRoundScore = calculateScore(playerDiceRolls[i][0], playerDiceRolls[i][1]);
        const computerRoundScore = calculateScore(computerDiceRolls[i][0], computerDiceRolls[i][1]);

        playerScore += playerRoundScore;
        computerScore += computerRoundScore;
    }

    $("#player-score").text(`${playerScore}`);
    $("#computer-score").text(`${computerScore}`);
};

    // End
    const endGame = () => {
        let winner;
        if (playerScore > computerScore) {
            winner = "Player wins!";
        } else if (computerScore > playerScore) {
            winner = "Computer wins!";
        } else {
            winner = "It's a tie!";
        }

        alert(`Game Over! ${winner}`);
        resetGame();
    };

    // Reset
    const resetGame = () => {
        playerScore = 0;
        computerScore = 0;
        rollCount = 0;
    
        // Clear previous dice rolls
        playerDiceRolls.length = 0;
        computerDiceRolls.length = 0;

        $("#player-score").text("0");
        $("#computer-score").text("0");

        // Update player dice images to default shield image
        for (let i = 0; i < 3; i++) {
            $(`#player-die-1-${i}`).attr("src", `../resources/images/dice-shield.svg`);
            $(`#player-die-2-${i}`).attr("src", `../resources/images/dice-shield.svg`);
        }
    
        // Update computer dice images to default shield image
        for (let i = 0; i < 3; i++) {
            $(`#computer-die-1-${i}`).attr("src", `../resources/images/dice-shield.svg`);
            $(`#computer-die-2-${i}`).attr("src", `../resources/images/dice-shield.svg`);
        }
    };
    

    $("#roll-btn").on("click", () => {
        // Roll dice and store rolls
        const playerRoll = [rollDice(), rollDice()];
        const computerRoll = [rollDice(), rollDice()];

        playerDiceRolls.push(playerRoll);
        computerDiceRolls.push(computerRoll);

        // Update dice images and score
        updateDiceImages(playerDiceRolls, computerDiceRolls);
        updateScore();

        rollCount++;

        if (rollCount === 4) {
            endGame();
        }
    });

    $("#reset-btn").on("click", () => {
        resetGame();
    });

    // Restart
    resetGame();
});
