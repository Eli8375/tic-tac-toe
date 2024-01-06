class Player {
    constructor(playerType, tookTurn, name) {
        this.name = name;
        this.playerType = playerType;
        this.tookTurn = tookTurn;
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
                    if (!this.myGame.checkForWin()) {
                        this.myGame.playerChoose(i, j);
                        cell.innerText = this.myGame.board[i][j];
                        this.myGame.checkForWin();
                        this.displayProfiles();
                        console.log(this.myGame.board);
                    }
                    onsole.log(this.myGame.board);
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
    }
    checkForWin() {
        //top across
        if ((this.board[0][0] == this.board[0][1]) && (this.board[0][1] == this.board[0][2])) {
            if (this.board[0][2] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //left down
        if ((this.board[0][0] == this.board[1][0]) && (this.board[1][0] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //middle across
        else if ((this.board[1][0] == this.board[1][1]) && (this.board[1][1] == this.board[1][2])) {
            if (this.board[1][2] == "X") {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //right down
        else if ((this.board[0][2] == this.board[1][2]) && (this.board[1][2] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //down across
        else if ((this.board[2][0] == this.board[2][1]) && (this.board[2][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //diagonal from left to right
        else if ((this.board[0][0] == this.board[1][1]) && (this.board[1][1] == this.board[2][2])) {
            if (this.board[2][2] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        //diagonal from right to left
        else if ((this.board[0][2] == this.board[1][1]) && (this.board[1][1] == this.board[2][0])) {
            if (this.board[2][0] == 'X') {
                this.player1.wins++;
                this.gameOver();
                return true;
            }
            else {
                this.player2.wins++;
                this.gameOver();
                return true;
            }
        }
        else return false;
    }
    gameOver() {
        if (this.player1.wins > this.player2.wins) {
            console.log("Player 1 wins!");
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
            return true;
        }
        else if (this.player1.wins < this.player2.wins) {
            console.log("Player 2 wins!");
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
            return true;
        }
        else if (this.player1.wins == this.player2.wins) {
            this.player1.tookTurn = false;
            this.player2.tookTurn = true;
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
    }
}

function hideButton(myGUI) {
    myGUI.hideButton();
}

function main() {
    let player1 = new Player('X', false, "PLACEHOLDER");
    let player2 = new Player('O', true, "PLACEHOLDER");
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

    /* if (myGame.checkForWin(player1, player2)) {
            myGame.gameOver(player1, player2);
        } */
    console.log(myGame.board);

    myGUI.playAgainButton.addEventListener('click', () => {
        myGame.resetGame();
        myGUI.resetDisplay();
        console.log(myGame.board);
    })
}

main();