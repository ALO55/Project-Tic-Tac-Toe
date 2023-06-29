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
    }

})();
//module for displaying a message 
const showMessage = (() => {
    let popup = document.querySelector('#popup');
    const closeBtn = document.querySelector('#close-btn');

    const renderMessage = (message) => {
       document.querySelector('#message').textContent = message; 
    }

    const openPopup = () => {
        popup.classList.add('open-popup');
    }

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('open-popup');
    })

    return {
        renderMessage,
        openPopup
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
                //stop the game 
                if (gameOver === true) {
                    return
                }
                //code to not rewrite the mark
                if(box.textContent !== ""){
                    return;
                }
                //add the mark inside the box
                box.textContent = `${players[playerIndex].mark}`;

                if (checkWin(box.textContent)) {
                    gameOver = true;
                    showMessage.renderMessage(`${players[playerIndex].name} won!`);
                    showMessage.openPopup();
                } 
                else if (checkDraw()){
                    gameOver = true;
                    showMessage.renderMessage("It's a draw");
                    showMessage.openPopup();
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

        //check if every square is fill
        function checkDraw () {
            return [...square].every(cell => {
                return cell.textContent.includes("X") || cell.textContent.includes("O");
            })
        }
    }

    function openPopup(){

    }

    const restart = () => {
        Gameboard.cleanBoard();
        showMessage.renderMessage("");
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

restartBtn.disabled = true;

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
    game.start();
    startBtn.disabled = true;
    restartBtn.disabled = false;
})