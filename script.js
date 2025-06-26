let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
totalScore();
let turn = 0;
let compT = 0;
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let stop = 0;
let computerTimeout = null;

document.body.addEventListener("keydown",(event)=>{
if (event.key === "r" || event.key === "R")
  reset();
else if(parseInt(event.key) > 0 && parseInt(event.key) < 10 )
{
  player(parseInt(event.key));
}
})

function player(ele) {
  let progress = document.getElementById("progress");
  if (stop === 1)
  {
    progress.textContent = "Game ended, reset to play again.";
    return;
  }
  let box = document.getElementById(`box-${ele}`);
  if (compT === 1) {
    progress.textContent = `Wait for computer turn`;
    return;
  }
  if (box.textContent === "X" || box.textContent === "O") {
    progress.textContent = `Box-${ele} is already filled`;
    return;
  }
  let start = turn % 2;
  if (start === 0) {
    box.textContent = "X";
    arr[ele - 1] = "X";
  }
  if (start === 1) {
    box.textContent = "O";
    arr[ele - 1] = "O";
  }
  progress.textContent = `You picked box-${ele}`;
  turn++;
  compT = 1;
  if(check(0))
  {return;}
  computerTimeout = setTimeout(computer, 1000);
}

function computer() {
  let progress = document.getElementById("progress");
  if (stop === 1)
  {
    progress.textContent = "Game ended, reset to play again.";
    return;
  }
  let box;
  let ele;
  for (;;) {
    ele = Math.ceil(Math.random() * 9);
    box = document.getElementById(`box-${ele}`);
    if (box.textContent === "X" || box.textContent === "O") {
      continue;
    } else {
      break;
    }
  }
  let start = turn % 2;
  if (start === 0) {
    box.innerHTML = "X";
    arr[ele - 1] = "X";
  }
  if (start === 1) {
    box.innerHTML = "O";
    arr[ele - 1] = "O";
  }
  progress.textContent = `Computer picked box-${ele}`;
  turn++;
  compT = 0;
  check(1);
}

function totalScore() {
  document.getElementById("score").textContent = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
  localStorage.setItem('score',JSON.stringify(score));
}

function check(T){
  let empty = 0;
  let progress = document.getElementById("progress");
  if (
    (arr[0] !== 0 && arr[0] === arr[1] && arr[1] === arr[2]) ||
    (arr[3] !== 0 && arr[3] === arr[4] && arr[4] === arr[5]) ||
    (arr[6] !== 0 && arr[6] === arr[7] && arr[7] === arr[8]) ||
    (arr[0] !== 0 && arr[0] === arr[3] && arr[3] === arr[6]) ||
    (arr[1] !== 0 && arr[1] === arr[4] && arr[4] === arr[7]) ||
    (arr[2] !== 0 && arr[2] === arr[5] && arr[5] === arr[8]) ||
    (arr[0] !== 0 && arr[0] === arr[4] && arr[4] === arr[8]) ||
    (arr[2] !== 0 && arr[2] === arr[4] && arr[4] === arr[6])
  )
  {
    if (T === 0)
    {
      progress.textContent = "You won the game!"
      score.wins++;
      stop = 1;
      totalScore();
      return 1;
    }
    if (T === 1)
    {
      progress.textContent = "Computer won the game!"
      score.losses++;
      stop = 1;
      totalScore();
      return 1;
    }
  }
  arr.forEach((i) => { if (i === 0) empty++; })
  if (empty === 0)
  {
    progress.textContent = "Tie!"
    score.ties++;
    stop = 1;
    totalScore();
    return 1;
  }
}

function reset()
{
  
  let progress = document.getElementById("progress");
  let box;
  for (let i = 0; i < 9 ; i++)
  {
    box = document.getElementById(`box-${i+1}`);
    box.textContent = "";
    arr[i] = 0;
  }
  progress.textContent = "Game reset!"
  stop = 0;
  if (computerTimeout) {
    clearTimeout(computerTimeout);
    computerTimeout = null;
  }
  if (compT === 1) {
    setTimeout(computer, 3000);
  }
}
