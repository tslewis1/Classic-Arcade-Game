// Enemies our player must avoid
class Enemy {
	constructor() {
	// The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 4) + 2;
		this.x = 0;
		this.y = (Math.floor(Math.random() * 3) + 1);
	};

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
	// You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    	this.x = this.x + this.speed * dt;
    	// alert(this.x + " " + this.speed + " " + dt);

    	// Creates method to handle enemy and player collision. On collision, the game resets.
    	if ((Math.round(this.x) == player.x) && (this.y == player.y)) {
    		location.reload(true);
    	};

    	// When enemy goes off screen, this resets their location
    	if(this.x > 5) {
    		this.x = -1;
    	};
	};

	// Draw the enemy on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), (this.x  + 0.5) * 101, (this.y - 0.5) * 83);
	};
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class that must avoid the enemies
class Player {
	constructor() {
		this.sprite = 'images/char-horn-girl.png';
		this.x = 2;
		this.y = 5;
		this.deltaX = 0;
		this.deltaY = 0;
	};

	// Update the player's position
	update() {
		this.x = this.x + (this.deltaX);
		this.deltaX = 0;
		this.y = this.y + (this.deltaY);
		this.deltaY = 0;
		console.log(this);

		// When player reaches the water, options to play again appear
		if(this.y == 1) {
			setTimeout(
				function(){
					player.y = 5;
					$("#congratulationsModal").show();
			}, 300);
		};

	};

	// Handles key input to change player location based on key presses

	handleInput(key) {
		switch (key) {
  		case 'left': 
  			if (this.x > 0) this.deltaX = -1;
    		break;
  		case 'up': 
  			if(this.y > 0) {
  				this.deltaY = -1; }
 			else {
 				this.deltaY = -this.y; 
 				this.deltaX = -this.x + 2; }
  			break;
  		case 'right': 
  			if(this.x < 4) this.deltaX = +1;
    		break;
    	case 'down': 
    		if(this.y < 4) this.deltaY = +1;
    		break;
  		default:
  			console.log('Error');
		};
	};

	// If player wants to play again, yes button resets the game and no button closes pop up


	// Draw the player on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y - 0.5) * 83);
	};
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];

for(var i = 0; i <= 1; i++) {
	var enemy = new Enemy();
	allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

console.log(enemy.x, enemy.y, player.x, player.y);
    player.handleInput(allowedKeys[e.keyCode]);
});

$("#no").on("click", function() {
	$("#congratulationsModal").hide();
});

$("#yes").on("click", function() {
	location.reload(true);
});