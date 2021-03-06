// Enemies our player must avoid
class Enemy {
	constructor() {
	// The image/sprite for our enemies
		this.sprite = 'images/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 4) + 2;
		this.x = 0;
		this.y = (Math.floor(Math.random() * 3) + 1);
	}

	// Update the enemy's position
	// Parameter: dt, a time delta between ticks
	update(dt) {
    	this.x = this.x + this.speed * dt;

    	// Creates method to handle enemy and player collision. On collision, the game resets.
    	if ((Math.round(this.x) == player.x) && (this.y == player.y)) {
    		location.reload(true);
    	}

    	// When enemy goes off screen, this resets their location
    	if(this.x > 5) {
    		this.x = -1;
    	}
	}

	// Draw the enemy on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), (this.x  + 0.5) * 101, (this.y - 0.5) * 83);
	}
}

// Player class that must avoid the enemies
class Player {
	constructor() {
		this.sprite = 'images/char-horn-girl.png';
		this.x = 2;
		this.y = 5;
		this.deltaX = 0;
		this.deltaY = 0;
	}

	// Update the player's position
	update() {
		this.x = this.x + (this.deltaX);
		this.deltaX = 0;
		this.y = this.y + (this.deltaY);
		this.deltaY = 0;

		// When player reaches the water, options to play again appear
		if((this.y == 1) && (gameIsDone === false)) {
			setTimeout(
				function() {
					endOfGame();
				}, 300);
		}
	}

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
		}
	}

	// If player wants to play again, yes button resets the game and no button closes pop up


	// Draw the player on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y - 0.5) * 83);
	}
}

var player = new Player();

var allEnemies = [];

var gameIsDone = false;

for(var i = 0; i <= 1; i++) {
	var enemy = new Enemy();
	allEnemies.push(enemy);
}

function endOfGame() {
// stop enemies' movements
	player.deltaX = 0;
	player.deltaY = 0;
	$(document).off("keyup");
	for(var i = 0; i < allEnemies.length; i++){
		allEnemies[i].speed = 0;
	}
	$("#congratulationsModal").show();
	console.log("hello");

	gameIsDone = true;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
$(document).on("keyup", function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

console.log(enemy.x, enemy.y, player.x, player.y);
    player.handleInput(allowedKeys[e.keyCode]);
});

$(document).on("click", "#no", function() {
	$(this).parent().parent().parent().css("display", "none");
});

$(document).on("click", "#yes", function() {
	location.reload(true);
	$(document).on();
	gameIsDone = false;
});