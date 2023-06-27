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

        
    };

    

    return {
        render,
    }

})();

const createPlayer = (name, mark) => {
    return{
        name,
        mark
    }
}

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
    }

    return{
        start
    }
})();


const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
    game.start();
})