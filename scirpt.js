const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// PLAYER
const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  size: 40,
  speed: 7
};

// DATA
const bullets = [];
const enemies = [];

let moveLeft = false;
let moveRight = false;
let score = 0;

// TOUCH CONTROLS
document.getElementById("left").ontouchstart  = () => moveLeft = true;
document.getElementById("left").ontouchend    = () => moveLeft = false;

document.getElementById("right").ontouchstart = () => moveRight = true;
document.getElementById("right").ontouchend   = () => moveRight = false;

document.getElementById("shoot").ontouchstart = () => {
  bullets.push({
    x: player.x,
    y: player.y,
    speed: 10
  });
};

// SPAWN ENEMY
setInterval(() => {
  enemies.push({
    x: Math.random() * (canvas.width - 40) + 20,
    y: -40,
    size: 35,
    speed: 3
  });
}, 1000);

// UPDATE
function update() {
  if (moveLeft)  player.x -= player.speed;
  if (moveRight) player.x += player.speed;

  player.x = Math.max(player.size / 2,
    Math.min(canvas.width - player.size / 2, player.x)
  );

  bullets.forEach(b => b.y -= b.speed);
  enemies.forEach(e => e.y += e.speed);

  // COLLISION
  enemies.forEach((e, ei) => {
    bullets.forEach((b, bi) => {
      if (
        b.x > e.x - e.size &&
        b.x < e.x + e.size &&
        b.y > e.y &&
        b.y < e.y + e.size
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });

    // GAME OVER
    if (e.y + e.size > player.y) {
      alert("Game Over! Score: " + score);
      location.reload();
    }
  });
}

// DRAW
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // PLAYER
  ctx.fillStyle = "cyan";
  ctx.fillRect(
    player.x - player.size / 2,
    player.y,
    player.size,
    player.size
  );

  // BULLETS
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    ctx.fillRect(b.x - 3, b.y, 6, 12);
  });

  // ENEMIES
  ctx.fillStyle = "red";
  enemies.forEach(e => {
    ctx.fillRect(e.x - e.size / 2, e.y, e.size, e.size);
  });

  // SCORE
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
