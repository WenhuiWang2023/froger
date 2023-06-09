const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const StartPauseButtion = document.querySelector("#start-pause-buttion");


const squares = document.querySelectorAll(".grid div");
const logsleft = document.querySelectorAll(".log-left");
const logsright = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20;

function moveFrog(e){
    squares[currentIndex].classList.remove('frog')
    switch(e.key){
        case 'ArrowLeft':
            if(currentIndex % width != 0){
                currentIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if(currentIndex % width != width-1){
                currentIndex += 1;
            }
            break;
        case 'ArrowUp':
            if(currentIndex > width -1 ){
                currentIndex -= width;
            }
            break;
        case 'ArrowDown':
            if(currentIndex < width*(width-1)){
                currentIndex += width;
            }
            break;
    }
    squares[currentIndex].classList.add('frog');
}




function autoMoveElements(){
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsleft.forEach(logleft => moveLogLeft(logleft));
    logsright.forEach(logright => moveLogRight(logright));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
    
}
function checkOutCome(){
    lose();
    win();
}

function moveLogLeft(logleft){
    switch(true){
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1');
            logleft.classList.add('l2');
            break;
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2');
            logleft.classList.add('l3');
            break;
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3');
            logleft.classList.add('l4');
            break;
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4');
            logleft.classList.add('l5');
            break;
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5');
            logleft.classList.add('l1');
            break;
    }
}

//setInterval(autoMoveLogs, 1000);

function moveLogRight(logright){
    switch(true){
        case logright.classList.contains('l1'):
            logright.classList.remove('l1');
            logright.classList.add('l5');
            break;
        case logright.classList.contains('l2'):
            logright.classList.remove('l2');
            logright.classList.add('l1');
            break;
        case logright.classList.contains('l3'):
            logright.classList.remove('l3');
            logright.classList.add('l2');
            break;
        case logright.classList.contains('l4'):
            logright.classList.remove('l4');
            logright.classList.add('l3');
            break;
        case logright.classList.contains('l5'):
            logright.classList.remove('l5');
            logright.classList.add('l4');
            break;
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function lose(){
    if(squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
    ){
        resultDisplay.textContent = 'You lose!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup',moveFrog);
    }
}

function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You win!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);

        //squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup',moveFrog);
    }
}
StartPauseButtion.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        timerId = null;
        outcomeTimerId = null;
        document.removeEventListener('keyup',moveFrog);
    } else{
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutCome, 50);
        document.addEventListener('keyup', moveFrog);
    }
})



