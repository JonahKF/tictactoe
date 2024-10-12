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
        if (board[row][column].getValue() !== 0) {
            console.log("Invalid move");
            return;
        };

        //Change value of space in nested array to player's token
        board[row][column].addToken(player);
        console.log("Token placed.")
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, placeToken, printBoard };
}


function cell() {
    let value = 0;

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
            token: 1
        },
        {
            name: playerTwo,
            token: 2
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


        switchPlayerTurn();
        printNewRound();
    };

    // Initial play game message
    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = gameController();