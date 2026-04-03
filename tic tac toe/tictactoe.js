const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#title');
const xplayerdisplay = document.querySelector('#xplayer');
const oplayerdisplay = document.querySelector('#oplayer');
const restartBtn = document.querySelector('#restartBtn');


let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputcells = ['' , '' , '' ,
                    '' , '' , '' ,
                    '' , '' , '' ]


const winConditions = [
    [ 0 , 1 , 2 ] , [ 3 , 4 , 5 ] , [ 6 , 7 , 8 ], //rows 
    [ 0 , 3 , 6 ] , [ 1 , 4 , 7 ] , [ 2 , 5 , 8 ], //colums
    [ 0 , 4 , 8 ] , [ 2 , 4 , 6 ]  //diagonals
]

cells.forEach((cell ,index) => {
    cell.addEventListener('click' ,() => tapcell(cell,index))
})

function tapcell(cell,index){
    if(cell.textContent == '' && !isPauseGame){
        isGameStart = true
        updatecell(cell,index)
        
        if(!checkWinner()){
           changePlayer()
           randomPick()
        }
        
    }
}

function updatecell(cell,index){
    cell.textContent = player
    inputcells[index] = player
    cell.style.color = (player == 'X') ? '#1892ea' : '#a737ff'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick(){
    isPauseGame = true
    setTimeout(() => {
        let randomIndex 
        do{
            randomIndex = Math.floor(Math.random() * inputcells.length)
        }while(
            inputcells[randomIndex] != ''

        )
        updatecell(cells[randomIndex],randomIndex,player)
        if(!checkWinner()){
            changePlayer()
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    },1000)
}

function checkWinner(){
    for(const [a,b,c] of winConditions){
        if(inputcells[a] == player && 
           inputcells[b] == player &&
           inputcells[c] == player  
        ){
            declareWinner([a ,b ,c])
            return true
        }
    }

    if(inputcells.every(cell => cell !=  '')){
        declareDraw()
        return true;
    }
}

function declareWinner(winningIndices){
    titleHeader.textContent = `${player} win`
    isPauseGame = true

    winningIndices.forEach((index) => 
    cells[index].style.background = '#2a2343'
)
   restartBtn.style.visibility = 'visible'
}

function declareDraw(){
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visibile'
}

function chooseplayer(selectedplayer){
    if(!isGameStart){
        player = selectedplayer
        if(player == 'X'){
            xplayerdisplay.classList.add('player-active')
            oplayerdisplay.classList.remove('player-active')
        }else{
            xplayerdisplay.classList.remove('player-active')
            oplayerdisplay.classList.add('player-active')

        }
    }
}


restartBtn.addEventListener('click',() => {
    restartBtn.style.visibility = 'hidden'
    inputcells.fill('')
        cells.forEach(cell => {
            cell.textContent = ''
            cell.style.background = ''
        })
        
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'   
})

