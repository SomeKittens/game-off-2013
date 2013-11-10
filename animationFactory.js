// Global game variables for debug with dat.gui
var g = {
	jumpHeight: 40,
	jumpSpace: 1,
	jumpIntervalTime: 10,
	moveSpace: 2,
	moveTime: 25
};

var animationFactory = function(spriteSheet) {
	return canvas.Animation.new({
	images: spriteSheet,
    animations: {
      move: {
        frames: [0, 49],
        size: {
          width: 64,
          height: 64
        },
        patternSize: {
          width: 49,
          height: 2
        },
        frequence: 1
      }
    }/*,
    TODO:
    attack: {
	
    }*/
	});
};