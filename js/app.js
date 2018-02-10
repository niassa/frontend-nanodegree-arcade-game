// Some Global Variables
var yPos = [60, 145, 234];
var moveUp = 83;
var moveDown = 83;
var moveLeft = 101;
var moveRight = 101;
var enemies = 1;
var allEnemies = [];
var success = false;
var level = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    var x = Math.floor(Math.random() * -250);
    var y = yPos[Math.floor(Math.random() * 3)];
    this.x = x;
    this.y = y;

    this.speed = 300 + Math.floor(Math.random() * 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = 1;
    }

    // Collision code
    if (player.x < this.x + 75 && player.x + 65 > this.x && player.y < this.y + 50 && 70 + player.y > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function loadEnemies() {
    allEnemies = [];
    for (var i = 0; i < enemies; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}

loadEnemies();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.speed = 100;
    this.x = x;
    this.y = y;
    this.sprite = "images/char-cat-girl.png";
};

// *** Sets the boundaries of movement for the player on the game board *** \\
Player.prototype.update = function() {
    if (this.x > 402) {
        this.x = 402;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    // *** If the character reaches the water, it's a success, increase the level by one *** \\
    if (this.y < 35) {
        this.y = 400;
        this.x = 200;
        success = true;
        level++;
    }
};

// *** Places the player on the board at the specified coordinates *** \\
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// *** Controls the movement of the player *** \\
Player.prototype.handleInput = function(allowedKey) {
    // *** As long as the player hasn't made it to the water yet, the key controls allow movement *** \\
    if (success === false) {
        switch (allowedKey) {
            case "up":
                this.y = this.y - moveUp;
                break;
            case "down":
                this.y = this.y + moveDown;
                break;
            case "left":
                this.x = this.x - moveLeft;
                break;
            case "right":
                this.x = this.x + moveRight;
                break;
        }
    } else { // *** If the player has succeeded, they get the level or win message and the only key allowed is Enter *** \\
        if (level < 10) {
            switch (allowedKey) {
                case "enter":
                    success = false;
                    // level++;
                    enemies = level;
                    loadEnemies();
                    break;
            }
        }
    }
};

// *** Resets the players position back to the bottom center *** \\
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// *** Actually places the player character on the board *** \\
var player = new Player(200, 400);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});