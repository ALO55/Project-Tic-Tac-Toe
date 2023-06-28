//This module creates the board game 
const Gameboard = (() =>{
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let boardHTML = "";

    const render = () => {
        gameboard.forEach((square, index) => {
            boardHTML = document.createElement('div')
            boardHTML.classList.add('square');
            boardHTML.setAttribute('id', `${index}`)
            document.querySelector('#gameboard').appendChild(boardHTML);
        })
    }

    const cleanBoard = () => {
        gameboard.forEach( () => {
            document.querySelector('#gameboard').textContent = "";
        })

    }

    return {
        render,
        cleanBoard
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
                //change the mark for the players
                playerIndex = playerIndex === 0 ? 1 : 0;
            });
        })
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
})