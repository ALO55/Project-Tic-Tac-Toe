//This module creates the board game 
const Gameboard = (() =>{
    let board = ["", "", "", "", "", "", "", "", ""];
    let boardHTML = "";

    const render = () => {
        board.forEach((square, index) => {
            boardHTML = document.createElement('div')
            boardHTML.classList.add('square');
            boardHTML.setAttribute('id', `${index}`)
            document.querySelector('#gameboard').appendChild(boardHTML);
        })
    }

    const cleanBoard = () => {
        board.forEach( () => {
            document.querySelector('#gameboard').textContent = "";
        })

    }

    return {
        render,
        cleanBoard,
        boardHTML
    }

})();
//Using factory function for the players
const createPlayer = (name, mark) => {
    return{
        name,
        mark
    }
}
//Using the module pattern to start the game
const game = (() => {
    let players = [];
    let playerIndex;
    let gameOver; 
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ] 

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, "X"),
            createPlayer(document.querySelector('#player2').value, "O")
        ]
        playerIndex = 0;
        gameOver = false;
        Gameboard.render();
        //check where the user is clicking 
        const square = document.querySelectorAll('.square');
        square.forEach((box) => {
            box.addEventListener('click', () => {
                if(box.textContent !== ""){
                    return;
                }
                box.textContent = `${players[playerIndex].mark}`;
                //check for win
                if (checkWin(box.textContent)) {
                    gameOver = true;
                    alert(`${players[playerIndex].name} won!`);
                }
                //change the mark for the players
                playerIndex = playerIndex === 0 ? 1 : 0;
            });
        })
        //Loop through each array of the winning combinations 
        function checkWin(mark) {
            return winningCombinations.some(combination => {
                return combination.every( index => {
                    return square[index].textContent.includes(mark)
                })
            })
        }

    }

    const restart = () => {
        Gameboard.cleanBoard();
        start();
    }



    return{
        start,
        restart
    }
})();

const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', () => {
    game.restart();
})

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
    game.start();
    startBtn.disabled = true;
})