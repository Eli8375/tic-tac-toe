class Player {
    constructor(playerType) {
        this.playerType = playerType;
    }
    tookTurn = false;
    wins = 0;
}

class GUI {
    constructor(player1, player2, myGame) {
        this.player1 = player1;
        this.player2 = player2;
        this.myGame = myGame;
    }
    body = document.getElementById('body');
    startButton = document.getElementById('start');
    playAgainButton = document.getElementById('restart');
    board = document.getElementById('board');
    createGrid() {
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('td');
                cell.classList.add('cell');
                cell.setAttribute('data-coordinate', `${i},${j}`);
                cell.addEventListener('click', () => {
                    cell.innerText = 'X';
                    this.myGame.playerChoose(i, j);
                    console.log(this.myGame.board);
                });
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }
    board = [[0, 1, 2], 
             [3, 4, 5], 
             [6, 7, 8]];
    playerChoose(k, l) {
        if (this.player1.playerType == 'X') {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board.length; j++) {
                    if (i == k && j == l) {
                    this.board[i][j] = 'X';
                    break;
                    }
                }
            }
            this.player1.tookTurn = true;
            this.player2.tookTurn = false;
        }
        else {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board.length; j++) {
                    if (i == k && j == l) {
                    this.board[i][j] = 'O';
                    break;
                    }
                }
            } 
            this.player2.tookTurn = true;
            this.player1.tookTurn = false;
        }
    }
    checkForWin() {
        //top across
        if ((this.board[0][0] == this.board[0][1]) && (this.board[0][1] == this.board[0][2])) {
            if (this.board[0][2] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //left down
        if ((this.board[0][0] == this.board[1][0]) && (this.board[1][0] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //middle across
        else if ((this.board[1][0] == this.board[1][1]) && (this.board[1][1] == this.board[1][2])) {
            if (this.board[1][2] == "X") {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //right down
        else if ((this.board[0][2] == this.board[1][2]) && (this.board[1][2] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //down across
        else if ((this.board[2][0] == this.board[2][1]) && (this.board[2][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //diagonal from left to right
        else if ((this.board[0][0] == this.board[1][1]) && (this.board[1][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        //diagonal from right to left
        else if ((this.board[0][2] == this.board[1][1]) && (this.board[1][1] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                return true;
            }
            else {
                this.player2.wins++;
                return true;
            }
        }
        else return false;
    }
    gameOver(player1, player2) {
        if (this.player1.wins > this.player2.wins) {
            console.log("Player 1 wins!");
            return true;
        }
        else if (this.player1.wins < this.player2.wins) {
            console.log("Player 2 wins!");
            return true;
        }
        else if (this.player1.wins == this.player2.wins) {
            console.log("Tie!");
            return true;
        }
        else return false;
    }
}

function main() {
    let player1 = new Player('X');
    let player2 = new Player('O');
    player2.tookTurn = true;
    let myGame = new Game(player1, player2);
    let myGUI = new GUI(player1, player2, myGame);

    myGUI.createGrid();

    myGUI.startButton.addEventListener('click', () => {
        if (myGame.checkForWin(player1, player2)) {
            myGame.gameOver(player1, player2);
        }
        myGame.playerChoose(player1, player2);
    })
    console.log(myGame.board);
}

main();