let boxes = document.querySelectorAll(".btn");
let reset = document.querySelector(".reset");
let newGame = document.querySelector(".new-game");
let win = document.querySelector(".winner");
let msg = document.querySelector(".msg");
let wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn0 = true;
let disabledBtns = 0;

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (!box.disabled) {
      if (turn0) {
        box.innerText = "O";
        turn0 = false;
        box.classList.add('red');
      } else {
        box.innerText = "X";
        turn0 = true;
        box.classList.add("blue");
      }
      box.disabled = true;
      disabledBtns += 1;
      if (disabledBtns === 9) {
        tie();
      }
      checkWinner();
      // Add animation
      gsap.from(box, {
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        ease: "bounce.out",
      });
    }
  });
});

function resetFnt() {
  turn0 = true;
  disabledBtns = 0;
  enableBtns();
  msg.classList.add("hide");
  gsap.from(".btn", { duration: 0.5, opacity: 0, y: -50, stagger: 0.1 });
  boxes.forEach((box)=>{    
    box.classList.remove("red");
    box.classList.remove("blue");
  })
}

reset.addEventListener("click", resetFnt);
newGame.addEventListener("click", resetFnt);

function disableBtns() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function enableBtns() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

function showWinner(winner) {
  msg.classList.remove("hide");
  win.innerText = `Congratulations, The Winner is ${winner}`;
  disableBtns();
  gsap.from(".winner-heading", { duration: 0.5, opacity: 0, y: -50 });
  gsap.from(".winner", { duration: 0.5, opacity: 0, y: -50 });
}

function tie() {
  msg.classList.remove("hide");
  win.innerText = `Oops, the game tied.`;
  gsap.from(".winner-heading", { duration: 0.5, opacity: 0, y: -50 });
  gsap.from(".winner", { duration: 0.5, opacity: 0, y: -50 });
}

function checkWinner() {
  for (let pattern of wins) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
}
