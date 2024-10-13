function boardStart() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let e = 0; e < columns; e++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (player, row, column) => {
        //Check if space is empty, return if not
        if (board[row][column].getValue() !== "-") {
            console.log("Invalid move");
            return;
        };

        //Change value of space in nested array to player's token
        board[row][column].addToken(player);
        console.log("Token placed.")

    };

    const checkVictory = () => {
        // Check Horizontal Victory
        for(let i = 0; i < rows; i++) {
            let scoreOne = 0;
            let scoreTwo = 0;
            for(let e = 0; e < columns; e++) {
                scoreOne = board[i][e].getValue() === "X" ? scoreOne = scoreOne + 1 : scoreOne; //scoreOne++ & ++scoreOne doesn't work, debug later.
                scoreTwo = board[i][e].getValue() === "O" ? scoreTwo = scoreTwo + 1 : scoreTwo; //scoreTwo++ & ++scoreTwo doesn't work
            }

            if(scoreOne === 3) {
                console.log("Player one wins!")
                return "oneWins";
            }
            else if(scoreTwo === 3) {
                console.log("Player two wins!")
                return "twoWins";
            }
        }

        //Check Vertical Victory
        for(let i = 0; i < rows; i++) {
            if(board[0][i].getValue() === "X" && board[1][i].getValue() === "X" && board[2][i].getValue() === "X") {
                console.log("Player one wins!")
                return "oneWins";
            }
            else if (board[0][i].getValue() === "O" && board[1][i].getValue() === "O" && board[2][i].getValue() === "O") {
                console.log("Player two wins!")
                return "twoWins";
            }
        }

        //Check Diagonal Victory
        if(board[0][0].getValue() === "X" && board[1][1].getValue() === "X" && board[2][2].getValue() === "X") {
            console.log("Player one wins!")
            return "oneWins";
        }
        else if(board[0][2].getValue() === "X" && board[1][1].getValue() === "X" && board[2][0].getValue() === "X") {
            console.log("Player one wins!")
            return "oneWins";
        }
        else if(board[0][0].getValue() === "O" && board[1][1].getValue() === "O" && board[2][2].getValue() === "O") {
            console.log("Player two wins!")
            return "twoWins";
        }
        else if(board[0][2].getValue() === "O" && board[1][1].getValue() === "O" && board[2][0].getValue() === "O") {
            console.log("Player two wins!")
            return "twoWins";
        }

    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, placeToken, checkVictory, printBoard };
}


function cell() {
    let value = "-";

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addToken, getValue };
}


function gameController(
  playerOne = "Player One",
  playerTwo = "Player Two"
) {
    const board = boardStart();

    const players = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        //Player takes turn
        board.placeToken(getActivePlayer().token, row, column);

        //Check for win condition
        if(board.checkVictory() !== "oneWins" && board.checkVictory() !== "twoWins"){
            switchPlayerTurn();
            printNewRound();
        }

    };

    // Initial play game message
    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function screenController() {
    const game = gameController();
    const turnDisplay = document.getElementById("active-player");
    const screen = document.getElementById("game-container");

    const updateScreen = () => {
        screen.textContent = "";

        activePlayerName = game.getActivePlayer().name;
        turnDisplay.textContent = `It is ${activePlayerName}'s turn.`

        const board = game.getBoard();

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getValue();
                screen.appendChild(cellButton);
            });      
        });
    };

    const clickBoard = (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow && !selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    };

    screen.addEventListener("click", clickBoard);

    updateScreen();

    // return { updateScreen, clickBoard }
}

screenController()