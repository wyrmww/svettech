// assets/js/game.js
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bonusEl = document.getElementById('bonus');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let bonuses = 0;
let isJumping = false;
let gameOver = false;
let speed = 5;

const dinoImg = new Image();
dinoImg.src = '2.webp';        // ← Твой динозаврик

const enemyImg = new Image();
enemyImg.src = '1.webp';       // ← Твой враг

const dino = {
    x: 50,
    y: 200,
    width: 90,
    height: 70,
    velocity: 0,
    gravity: 0.85,
    jumpPower: -22
};

const obstacles = [];
let frame = 0;

document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Spacebar') && !isJumping && !gameOver) {
        jump();
    }
});

canvas.addEventListener('click', () => {
    if (!isJumping && !gameOver) jump();
});

function jump() {
    isJumping = true;
    dino.velocity = dino.jumpPower;
}

function update() {
    if (gameOver) return;

    frame++;
    score += 1;
    scoreEl.textContent = Math.floor(score / 5);

    if (score % 500 === 0) {
        bonuses += 50;
        bonusEl.textContent = bonuses;
    }

    dino.velocity += dino.gravity;
    dino.y += dino.velocity;

    if (dino.y >= 200) {
        dino.y = 200;
        isJumping = false;
        dino.velocity = 0;
    }

    if (frame % 75 === 0) {
        obstacles.push({
            x: 800,
            y: 200,
            width: 50,
            height: 60
        });
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;

        if (
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.x + dino.width > obstacles[i].x &&
            dino.y < obstacles[i].y + obstacles[i].height &&
            dino.y + dino.height > obstacles[i].y
        ) {
            endGame();
        }
    }

    if (obstacles.length > 0 && obstacles[0].x < -60) {
        obstacles.shift();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Земля
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 250, canvas.width, 5);

    // Динозаврик
    if (dinoImg.complete) {
        ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    } else {
        ctx.fillStyle = '#ff4500';
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    }

    // Враги
    ctx.fillStyle = '#228B22';
    for (let obs of obstacles) {
        if (enemyImg.complete) {
            ctx.drawImage(enemyImg, obs.x, obs.y, obs.width, obs.height);
        } else {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        }
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameOver = true;
    restartBtn.style.display = 'inline-block';

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        user.bonuses = (user.bonuses || 0) + Math.floor(bonuses);
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Игра окончена! Вы заработали ${Math.floor(bonuses)} бонусов!`);
    }
}

window.restartGame = function() {
    score = 0;
    bonuses = 0;
    obstacles.length = 0;
    dino.y = 200;
    dino.velocity = 0;
    gameOver = false;
    frame = 0;
    scoreEl.textContent = '0';
    bonusEl.textContent = '0';
    restartBtn.style.display = 'none';
};

restartBtn.addEventListener('click', restartGame);

gameLoop();