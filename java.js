const Gameboard = (() =>{
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += document.createElement('div')
            boardHTML.classList.add('square');
            boardHTML.setAttribute('id', `${index}`)
            boardHTML.innerHTML = `${square}`
        })

        document.querySelector('#gameboard').appendChild(boardHTML);
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
    let gameover; 

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, "X"),
            createPlayer(document.querySelector('#player2').value, "O")
        ]
        playerIndex = 0;
        gameover = false;
    }
})();


const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
     
})