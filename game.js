let player;
let obstacles = [];
let score = 0;
let gameOver = false;

// function setup() {
//     let canvas = createCanvas(400, 600);
//     canvas.parent("game-container");
//     player = new Player();
//     frameRate(60);
// }

function setup() {
    let canvasWidth = windowWidth * 0.9; 
    let canvasHeight = windowHeight * 0.7; 

    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("game-container");

    player = new Player();
    frameRate(60);
}


function windowResized() {
    let canvasWidth = windowWidth * 0.9;
    let canvasHeight = windowHeight * 0.7;
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);

    if (!gameOver) {
        player.show();

        // Generazione ostacoli
        if (frameCount % 40 === 0) {
            obstacles.push(new Obstacle());
        }

        // Disegna e aggiorna gli ostacoli
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].show();
            obstacles[i].update();

            // Controllo collisione
            if (obstacles[i].hits(player)) {
                gameOver = true;
            }

            // Rimuovi ostacoli fuori dallo schermo
            if (obstacles[i].offScreen()) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        // Mostra il punteggio
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text(`Score: ${score}`, width / 2, 40);
    } else {
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER);
        text("Sei nà bella pippa", width / 2, height / 2);
        textSize(20);
        text("Tap to Restart", width / 2, height / 2 + 40);
    }
}

// Movimento tramite tap
function touchStarted() {
    if (gameOver) {
        resetGame();
    } else {
        player.switchSide();
    }
    return false;
}

// Classe Giocatore
class Player {
    constructor() {
        this.x = width / 4;
        this.y = height - 50;
        this.size = 40;
        this.emoji = "👩‍🚀👨‍🚀";
    }
    show() {
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.emoji, this.x + this.size / 2, this.y + this.size / 2);
    }
    switchSide() {
        this.x = this.x === width / 4 ? (3 * width) / 4 : width / 4;
    }
}

// Classe Ostacolo
class Obstacle {
    constructor() {
        this.x = random([width / 4, (3 * width) / 4]);
        this.y = 0;
        this.size = 40;
        this.speed = 5 + score * 0.1;
        this.emoji = "👽"; // Cambia l'emoji qui!
    }
    show() {
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.emoji, this.x + this.size / 2, this.y + this.size / 2);
    }
    update() {
        this.y += this.speed;
    }
    offScreen() {
        return this.y > height;
    }
    hits(player) {
        return collideRectRect(this.x, this.y, this.size, this.size, player.x, player.y, player.size, player.size);
    }
}

// Funzione Reset Gioco
function resetGame() {
    gameOver = false;
    obstacles = [];
    score = 0;
    player = new Player();
}