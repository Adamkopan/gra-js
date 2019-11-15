import { Game } from "./components/Game.js";

const start = document.querySelector('.start');
start.addEventListener('click', () => {
  start.style.display = "none";
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext("2d");
  canvas.style.display = "start";
  const game = new Game(canvas, ctx, 1224, 612, 1, 800, true);
  game.play();
})
