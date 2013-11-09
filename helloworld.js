
var canvas = CE.defines('canvas')
  .extend(Input)
  .extend(Hit)
  .extend(Animation)
  .ready(function() {
  canvas.Scene.call('helloworld');
});

canvas.Scene.new({
  name: 'helloworld',
  materials: {
    images: {
      stickFigure: 'img/stick_figure.png',
      gif: 'img/walk.gif',
      bg: 'img/b1mid.png',
      george2walk: 'img/george2walk.png'
    }
  },
  preload: function(stage, pourcent) {
    console.log('preloaded');
    console.log(pourcent);
  },
  ready: function(stage) {
    console.log('ready');
    this.timer = 0;

    // Variables that are used in render
    this.jumping = false;
    this.intervals = {};

    // Draw background first so it's in the back
    // HA!  Aren't I clever.
    this.bg = this.createElement();
    this.bg.drawImage('bg');
    stage.append(this.bg);

    this.george = this.createElement();
    this.george.y = 165;
    this.george2Walk = canvas.Animation.new({
      images: 'george2walk',
      animations: {
        run: {
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
      }
    });
    stage.append(this.george);
    this.george2Walk.add(this.george);
/*
    this.enemy = this.createElement();
    this.enemy.drawImage('stickFigure');
    this.enemy.x = this.enemy.y = 400;
    stage.append(this.enemy);
  */
  },
  render: function(stage) {
    this.timer++;
    var self = this;
    canvas.Input.keyDown(Input.Right, function() {
      if (!self.intervals.walkingRight) {
        self.intervals.walkingRight = setInterval(function() {
          self.george.x += 2;
        }, 25);
      }
      if (!self.jumping) {
        self.george2Walk.play('run', 'loop');
      }
    });
    canvas.Input.keyDown(Input.Left, function() {
      if (!self.intervals.walkingLeft) {
        self.intervals.walkingLeft = setInterval(function() {
          self.george.x -= 2;
        }, 25);
      }
      if (!self.jumping) {
        self.george2Walk.play('run', 'loop');
      }
    });
    canvas.Input.keyUp(Input.Right, function() {
      self.george2Walk.stop();
      clearInterval(self.intervals.walkingRight);
      self.intervals.walkingRight = null;
    });
    canvas.Input.keyUp(Input.Left, function() {
      self.george2Walk.stop();
      clearInterval(self.intervals.walkingLeft);
      self.intervals.walkingLeft = null;
    });
    canvas.Input.keyDown(Input.Up, function() {
      if (self.jumping) {
        return;
      }
      self.jumping = true;
      self.george2Walk.stop();
      var goUp = function() {
        if (self.george.y > 125) {
          setTimeout(goUp, 10);
        } else {
          setTimeout(goDown, 10);
        }
        self.george.y -= 1;
      };
      var goDown = function() {
        if (self.george.y < 165) {
          setTimeout(goDown, 10);
          self.george.y += 1;
        } else {
          self.jumping = false;
        }
      };
      goUp();
    });
    /*
    canvas.Input.keyDown(Input.Bottom, function() {
      self.george.y += 10;
    });
*/
    stage.refresh();
  },
  exit: function() {
    console.log('exit');
  }
});