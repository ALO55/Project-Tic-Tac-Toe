//This module creates the board game 
const Gameboard = (() =>{
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML = document.createElement('div')
            boardHTML.classList.add('square');
            boardHTML.setAttribute('id', `${index}`)
            document.querySelector('#gameboard').appendChild(boardHTML);
        })
    }


    return {
        render,
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


    return{
        start,
    }
})();


const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
    game.start();
})