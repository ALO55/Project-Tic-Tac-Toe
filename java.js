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



const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {
     
})