class Player {
    constructor(playerType, tookTurn, name, turnsLeft) {
        this.name = name;
        this.playerType = playerType;
        this.tookTurn = tookTurn;
        this.turnsLeft = turnsLeft;
    }
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
    displayProfiles() {
        let player1 = document.getElementById('player1');
        player1.innerText = this.player1.name;
        let player2 = document.getElementById('player2');
        player2.innerText = this.player2.name;
        let player1Stats = document.getElementById('player1-stats');
        player1Stats.innerText = this.player1.wins;
        let player2Stats = document.getElementById('player2-stats');
        player2Stats.innerText = this.player2.wins;
    }
    createGrid() {
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('td');
                cell.classList.add('cell');
                cell.setAttribute('data-coordinate', `${i},${j}`);
                cell.addEventListener('click', () => {
                    if (this.myGame.locked == false) {
                        this.myGame.playerChoose(i, j);
                        cell.innerText = this.myGame.board[i][j];
                        this.myGame.checkForWin();
                        this.displayProfiles();
                        console.log(this.myGame.board);
                    }
                });
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }
    resetDisplay() {
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
        }
    }
    hideButton() {
        this.startButton.style.display = 'none';
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
    movesAvailable = 9;
    locked = false;
    playerChoose(k, l) {
        if (this.board[k][l] != 'X' && this.board[k][l] != 'O') {
            if (this.player1.playerType == 'X' && this.player1.tookTurn == false) {
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
                this.player1.turnsLeft--;
                this.movesAvailable--;
                console.log(this.movesAvailable);
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
                this.player2.turnsLeft--;
                this.movesAvailable--;
                console.log(this.movesAvailable);
            }
        } 
    }
    checkForWin() {
        if (this.movesAvailable <= 0) {
            this.gameOver('N/A');
            return true;
        }
        //top across
        if ((this.board[0][0] == this.board[0][1]) && (this.board[0][1] == this.board[0][2])) {
            if (this.board[0][2] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //left down
        if ((this.board[0][0] == this.board[1][0]) && (this.board[1][0] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //middle across
        else if ((this.board[1][0] == this.board[1][1]) && (this.board[1][1] == this.board[1][2])) {
            if (this.board[1][2] == "X") {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //right down
        else if ((this.board[0][2] == this.board[1][2]) && (this.board[1][2] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //down across
        else if ((this.board[2][0] == this.board[2][1]) && (this.board[2][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //diagonal from left to right
        else if ((this.board[0][0] == this.board[1][1]) && (this.board[1][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //straight down
        else if ((this.board[0][1] == this.board[1][1]) && (this.board[1][1] == this.board[2][1])) {
            if (this.board[2][1] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        //diagonal from right to left
        else if ((this.board[0][2] == this.board[1][1]) && (this.board[1][1] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                this.gameOver('X');
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver('O');
                return true;
            }
        }
        else {
            return false;
        }
    }
    gameOver(playerType) {
        if (playerType == 'X') {
            console.log("Player 1 wins!");
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
            this.locked = true;
            return true;
        }
        else if (playerType == 'O') {
            console.log("Player 2 wins!");
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
            this.locked = true;
            return true;
        }
        else if (this.movesAvailable <= 0) {
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
            this.locked = true;
            console.log("Tie!");
            return true;
        }
        else return false;
    }
    resetGame() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (i == 0) this.board[i][j] = j;
                else if (i == 1) this.board[i][j] = j + 3;
                else this.board[i][j] = j + 6;
            }
        }
        this.player1.turnsLeft = 5;
        this.player2.turnsLeft = 4;
        this.movesAvailable = 9;
        this.locked = false;
    }
}

function hideButton(myGUI) {
    myGUI.hideButton();
}

function main() {
    let player1 = new Player('X', false, "PLACEHOLDER", 5);
    let player2 = new Player('O', true, "PLACEHOLDER", 4);
    let myGame = new Game(player1, player2);
    let myGUI = new GUI(player1, player2, myGame);


    myGUI.startButton.addEventListener('click', () => { 
        let username1 = window.prompt("Please enter username for player 1.");
        let username2 = window.prompt("Please enter username for player 2.");
        player1.name = username1;
        player2.name = username2;
        myGUI.displayProfiles();
        myGUI.createGrid();
        hideButton(myGUI);
    })

    console.log(myGame.board);

    myGUI.playAgainButton.addEventListener('click', () => {
        myGame.locked = false;
        myGame.resetGame();
        myGUI.resetDisplay();
        console.log(myGame.board);
    })
}

main();