// Global game variables for debug with dat.gui
var gameVars = {
	george: {
		jumpHeight: 40,
		jumpSpace: 1,
		jumpIntervalTime: 10,
		moveSpace: 2,
		moveTime: 25,
    activatePortals: false
	}
};

var animationFactory = function(spriteSheet, portal) {
  console.log(portal);
  var wid = portal ? 17 : 16;
  console.log(wid);
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
          width: wid,
          height: 5
        },
        frequence: 1
      },
      jump: {
        frames: [49, 60],
        size: {
          width: 64,
          height: 64
        },
        patternSize: {
          width: 16,
          height: 5
        },
        frequence: 4
      },
      attack0: {
        frames: [60, 65],
        size: {
          width: 64,
          height: 64
        },
        patternSize: {
          width: 16,
          height: 5
        },
        frequence: 2
      },
      attack1: {
        frames: [65, 70],
        size: {
          width: 64,
          height: 64
        },
        patternSize: {
          width: 16,
          height: 5
        },
        frequence: 2
      }
    }
	});
};