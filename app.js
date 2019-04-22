/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

window.onload = function(){
  playerOneName()
  playerTwoName()
  alert('Click player name to change at any time.');
}

var personOne, personTwo

function playerOneName(){
  personOne = prompt("Enter name for Player 1", "PLAYER 1");
  document.getElementById("name-0").innerHTML = personOne;
  return personOne
}

function playerTwoName(){
  personTwo = prompt("Enter name for Player 2", "PLAYER 2");
  document.getElementById("name-1").innerHTML = personTwo;
  return personTwo
}

// ROLL BUTTON
var roll = document.getElementsByClassName("btn-roll")[0];
var dice = document.getElementsByClassName("dice")[0];
var dice2 = document.getElementsByClassName("dice2")[0];

var num, num2, prevPlayer

var test = "hello"

function rollDice(){
  num = Math.trunc((Math.random()*6+1));
  num2 = Math.trunc((Math.random()*6+1));
  dice.setAttribute("src", "dice-" + num + ".png");
  dice2.setAttribute("src", "dice-" + num2 + ".png");
}

roll.onclick = function() {
  diceRoll()
}

function diceRoll(){
  prev = num;
  prev2 = num2;
  rollDice();
  if (num == 1 || num2 == 1){
    setTimeout(function(){alert("You rolled a 1")}, 100);
    resetScore();
    setTimeout(changePlayer(), 300);
  } else if(
    (prev == 6 || prev2 == 6) &&
    (num == 6 || num2 == 6) &&
    prevPlayer == activePlayer()){
      setTimeout(function(){alert("You rolled two 6's in a row")}, 100);
      resetScore();
      setTimeout(changePlayer(), 300);
  } else {
    addScore();
    prevPlayer = activePlayer();
    checkWin();
  }
  dice.removeAttribute("hidden","");
  dice2.removeAttribute("hidden","");
}

// SCORE COUNTER

    // Active player
var player1 = document.getElementsByClassName("player-0-panel")[0]
var player2 = document.getElementsByClassName("player-1-panel")[0]

function activePlayer(){
  active = document.getElementsByClassName("active")[0]
  if (active == player1){
    return player1
  } else if (active == player2){
    return player2
  }
}

    // Active Score
function activeScore(){
  var activeScore = activePlayer().getElementsByClassName("player-score")[0];
  return activeScore
}

    //Add score
function addScore(){
  activeScore()
  activeScore().innerHTML = activeScore().innerHTML * 1 + num + num2;
}

// CHANGE PLAYER
function changePlayer(){
  if (activePlayer() == player1){
    player1.classList.remove("active")
    player2.classList.add("active")
  } else {
    player2.classList.remove("active")
    player1.classList.add("active")
  }
}

// HOLD BUTTON & CURRENT SCORE
var hold = document.getElementsByClassName("btn-hold")[0];

function activeCurrent(){
  var activeCurrent = activePlayer().getElementsByClassName("player-current-score")[0];
  return activeCurrent
}

function keepScore(){
  activeCurrent().innerHTML = activeCurrent().innerHTML * 1 + activeScore().innerHTML * 1
}

function resetScore(){
  activeScore().innerHTML = 0
}

hold.onclick = function(){
  holdFunction();
}

function holdFunction(){
  keepScore();
  resetScore();
  changePlayer();
}

// DECLARE PLAYER WON IF REACHES 100
// (score, or current score + score)
function checkWin(){
  if (activeCurrent().innerHTML*1 + activeScore().innerHTML*1 >= score()){
    keepScore();
    resetScore();
    winner = activePlayer().getElementsByClassName("player-name")[0];
    winner.classList.add("winner");
    winner.innerHTML = "Winner!!";
    roll.onclick = function(){};
    hold.onclick = function(){};
    }
  }

// START NEW GANE ON NEW GAME BUTTON CLICK
var newGame = document.getElementsByClassName("btn-new")[0];

newGame.onclick = function(){
  winner = activePlayer().getElementsByClassName("player-name")[0];
  activeName = activePlayer().getElementsByClassName("player-name-input")[0].value
  activeScore().innerHTML = 0;
  activeCurrent().innerHTML = 0;
  winner.classList.remove("winner");
  winner.innerHTML = activeName;
  changePlayer();
  activeScore().innerHTML = 0;
  activeCurrent().innerHTML = 0;
  if (activePlayer() == player2){
    changePlayer();
  }
  roll.onclick = function(){diceRoll();}
  hold.onclick = function(){holdFunction();}
  dice.setAttribute("hidden","")
  dice2.setAttribute("hidden","")
}

// CHANGE NAME
var nameBox = document.getElementsByClassName("change-name");
var name1 = document.getElementById("name-0");
var name2 = document.getElementById("name-1");


name1.onclick = function(){
  setTimeout(function(){
    nameBox[0].removeAttribute("hidden")
  }, 300);
}

name2.onclick = function(){
  setTimeout(function(){
    nameBox[1].removeAttribute("hidden")
  }, 300);
}

var nameButton = document.getElementsByClassName("name-button");
var playerName = document.getElementsByClassName("player-name-input");

nameButton[0].onclick = function(){
  name1.innerHTML = playerName[0].value
  setTimeout(function(){
    nameBox[0].setAttribute("hidden", "")
  }, 300);
}


nameButton[1].onclick = function(){
  name2.innerHTML = playerName[1].value
  setTimeout(function(){
    nameBox[1].setAttribute("hidden", "")
  }, 300);
}

// Prevent name form from actually sending http request
var form = document.getElementsByClassName("name-form");
form[0].onsubmit = function(){
  return false
}

form[1].onsubmit = function(){
  return false
}


// SET SCORE

function score(){
  setScore = document.getElementsByClassName("set")[0].value;
  if (setScore >= 1) {
    return setScore * 1 ;
  } else {
    return 100;
  }
}

var scoreForm = document.getElementsByClassName("score-form")[0];

scoreForm.onsubmit = function(){
  if(typeof(score()*1) === number)
  return false;
}


// GAME Rules
var info = document.querySelector('.btn-info')
var rules = document.querySelector('.rules')
var close = document.querySelector('.btn-close')

info.addEventListener('click', () => {
  rules.style.visibility = 'visible'
})

close.addEventListener('click', () => {
  rules.removeAttribute('style')
})
