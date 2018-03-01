// Enemies our player must avoid
class Enemy {
	constructor() {
	// The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 4) + 2;
		this.x = 0;
		this.y = Math.floor(Math.random() * 3) + 1  ;
	};

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
	// You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    	this.x = this.x + this.speed * dt;
	};

	// Draw the enemy on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class that must avoid the enemies
var Player =  function() {
	this.sprite = 'images/char-horn-girl.png';
};

// Update the player's position
Player.prototype.update = function(dt) {

};

// Draw the player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
