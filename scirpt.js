const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  size: 40,
  speed: 7
};

const bullets = [];
let moveLeft = false;
let moveRight = false;

// Touch controls
document.getElementById("left").ontouchstart = () => moveLeft = true;
document.getElementById("left").ontouchend   = () => moveLeft = false;

document.getElementById("right").ontouchstart = () => moveRight = true;
document.getElementById("right").ontouchend   = () => moveRight = false;

document.getElementById("shoot").ontouchstart = () => {
  bullets.push({ x: player.x, y: player.y, speed: 10 });
};

function update() {
  if (moveLeft)  player.x -= player.speed;
  if (moveRight) player.x += player.speed;

  player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));

  bullets.forEach(b => b.y -= b.speed);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x - player.size/2, player.y, player.size, player.size);

  // Bullets
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    ctx.fillRect(b.x - 3, b.y, 6, 12);
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
