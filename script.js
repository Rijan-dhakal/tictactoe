const board = document.querySelector(".board");
const cell = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#reset");
const overlay = document.querySelector("#overlay");
const winMsg = document.querySelector("#winner-message");
const playAgain = document.querySelector("#play-again");
const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let userX = true;
let userXplays = [];
let userYplays = [];

// handeling click event
board.addEventListener("click", (e) => {
  const target = e.target.closest(".cell");
  if (!target || target.innerText) return;

  if (userX) {
    target.innerText = "X";
    userXplays.push(Number(target.dataset.index));
    gameLogic(winning);
  } else {
    target.innerText = "O";
    userYplays.push(Number(target.dataset.index));
    gameLogic(winning);
  }
});

// function for setTimeout
const timeoutFxn = function () {
  setTimeout(() => {
    cell.forEach((box) => (box.textContent = ""));
    userX = true;
    userXplays = [];
    userYplays = [];
  }, 500);
};

// logic for tic tac toe
const logicChecker = function (whichUser, compareNum) {
  const tempVal = whichUser.includes(compareNum);
  return tempVal;
};

// logic for winning and msg
const gameLogic = function (winning) {
  winning.forEach((element) => {
    if (userX) {
      if (
        logicChecker(userXplays, element[0]) &&
        logicChecker(userXplays, element[1]) &&
        logicChecker(userXplays, element[2])
      ) {
        setTimeout(() => {
          overlayManager(userX);
        }, 1);
        timeoutFxn();
        return;
      }
    } else {
      if (
        logicChecker(userYplays, element[0]) &&
        logicChecker(userYplays, element[1]) &&
        logicChecker(userYplays, element[2])
      ) {
        setTimeout(() => {
          overlayManager(userX);
        }, 1);
        timeoutFxn();
        return;
      }
    }
  });
  handleDraw();
  userX = !userX;
};

// overlay handler
const overlayManager = function (player) {
  overlay.classList.remove("hidden");
  winMsg.innerText = !player ? "X wins!" : "O wins!";
};

// handeling draw
const handleDraw = function () {
  if (userXplays.length + userYplays.length === 9) {
    setTimeout(() => {
      overlay.classList.remove("hidden");
      winMsg.innerText = "Its a draw";
    }, 1);
    timeoutFxn();
    return;
  }
};

//function for setting default
const reset = function () {
  winMsg.innerText = "";
  overlay.classList.add("hidden");
  cell.forEach((box) => (box.textContent = ""));
  userX = true;
  userXplays = [];
  userYplays = [];
};

//event handlers for buttons
playAgain.addEventListener("click", () => reset());
resetBtn.addEventListener("click", () => reset());
