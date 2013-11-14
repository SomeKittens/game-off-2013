// Global game variables for debug with dat.gui
var gameVars = {
  george: {
    jumpHeight: 40,
    jumpSpace: 1,
    jumpIntervalTime: 10,
    moveSpace: 2,
    moveTime: 25
  },
  thug: {
    moveSpace: 1
  },
  noLose: true
};


var animationFactory = {
  generate: function(character) {
    var datums
      , hei;
    var ani = function(frames, freq) {
      return {
        frames: frames,
        size: {
          width: 64,
          height: 64
        },
        patternSize: {
          width: 16,
          height: hei
        },
        frequence: freq
      };
    };
    switch (character) {
      case 'george2':
        hei = 5;
        datums = {
          images: 'george2sprites',
          animations: {
            move: ani([0, 49], 1),
            jump: ani([50, 60], 4),
            attack0: ani([61, 65], 2),
            attack1: ani([66, 69], 2)
          }
        };
        break;
      case 'thug':
        hei = 7;
        datums = {
          images: 'thugSprites',
          animations: {
            walk: ani([0, 49], 1),
            grab: ani([50, 60], 3),
            grabPunch: ani([60, 66], 6),
            pain1: ani([66, 71], 1),
            pain2: ani([71, 76], 1),
            idle: ani([76, 100], 1),
            die: ani([100, 111], 3)
          }
        };
        break;
      default:
        throw new Error('You haven\'t made that character yet, you dolt');
        break;
    }
    return canvas.Animation.new(datums);
  }
};