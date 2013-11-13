var George = function(xCoord, yCoord) {
  var self = this
    , george = self.createElement();
  george.drawImage('george2still');
  george.x = xCoord || 0;
  george.y = yCoord || 0;
  george.health = 2;
  motions = animationFactory.generate('george2');
  motions.add(george);

  return {
    el: george,
    motions: motions,
    update: function(canvas) {
      var self = this
        , g = gameVars.george;
      canvas.Input.keyDown(Input.Right, function() {
        if (!self.intervals.walkingRight) {
          self.intervals.walkingRight = setInterval(function() {
            george.x += g.moveSpace;
          }, g.moveTime);
        }
        if (!self.jumping) {
          motions.play('move', 'loop');
        }
      });
      canvas.Input.keyDown(Input.Left, function() {
        if (!self.intervals.walkingLeft) {
          self.intervals.walkingLeft = setInterval(function() {
            george.x -= g.moveSpace;
          }, g.moveTime);
        }
        if (!self.jumping) {
          motions.play('move', 'loop');
        }
      });

      canvas.Input.keyUp(Input.Right, function() {
        motions.stop();
        clearInterval(self.intervals.walkingRight);
        self.intervals.walkingRight = null;
      });
      canvas.Input.keyUp(Input.Left, function() {
        motions.stop();
        clearInterval(self.intervals.walkingLeft);
        self.intervals.walkingLeft = null;
      });

      // Attacking
      canvas.Input.keyDown(Input.A, function() {
        motions.stop();
        if (Math.random() > 0.5) {
          motions.play('attack0', 'stop');
        } else {
          motions.play('attack1', 'stop');
        }
        // If there are any thugs in front of george, kill them
        self.thugs.forEach(function(thug) {
          var dist = Math.abs(george.x - thug.el.x);
          if (dist < 40) {
            thug.kill();
          }
        });
      });

      canvas.Input.keyDown([Input.Up, Input.Z], function() {
        if (self.jumping) {
          return;
        }
        self.jumping = true;
        motions.stop();
        // No idea why this only works with loop.
        motions.play('jump', 'loop');
        var goUp = function() {
          if (george.y > (165 - g.jumpHeight)) {
            setTimeout(goUp, g.jumpIntervalTime);
          } else {
            setTimeout(goDown, g.jumpIntervalTime);
          }
          george.y -= g.jumpSpace;
        };
        var goDown = function() {
          if (george.y < 165) {
            setTimeout(goDown, g.jumpIntervalTime);
            george.y += g.jumpSpace;
          } else {
            self.jumping = false;
            if (canvas.Input.isPressed([Input.Left, Input.Right])) {
              motions.play('move', 'loop');
            } else {
              motions.stop();
            }
          }
        };
        goUp();
      });
    }
  };
};

var enemy1 = {
  init: function() {
    var self = this;
    var me = self.enemy1;

    var goLeft = function() {
      if (me.x > 300) {
        me.x -= 2;
        setTimeout(goLeft, 25);
      } else {
        setTimeout(goRight, 25);
      }
    };
    var goRight = function() {
      if (me.x < 450) {
        me.x += 2;
        setTimeout(goRight, 25);
      } else {
        setTimeout(goLeft, 25);
      }
    };
    goLeft();
  }
};

var Thug = function(xCoord, yCoord) {
  var self = this
    , thug = self.createElement()
    , t = gameVars.thug
    , motions = animationFactory.generate('thug');

  thug.x = xCoord || 0;
  thug.y = yCoord || 0;
  thug.alive = true;
  thug.drawImage('thugStill');
  motions.add(thug);

  var attack = function() {
    if (thug.attacking) {
      waiting++;
      if (waiting > 60) {
        waiting = 0;
        thug.attacking = false;
      }
      return;
    }
    thug.attacking = true;
    waiting = 0;
    if (!self.george.el.invulnerable) {
      self.george.el.invulnerable = true;
      var interval = setInterval(function() {
        self.george.el.toggle();
      }, 100);
      setTimeout(function() {
        self.george.el.invulnerable = false;
        self.george.el.show();
        clearInterval(interval);
      }, 750);
      self.george.el.health -= 1;
      console.log(self.george.el.health);
    }
    var action = Math.random() > 0.5 ? 'grab' : 'grabPunch';
    motions.play(action, 'stop');
  };
  return {
    el: thug,
    motions: motions,
    update: function(canvas) {
      var self = this;
      var dist = self.george.el.x - thug.x;
      if (thug.alive) {
        if (dist > 25 && dist < 100) {
          thug.waiting = 0;
          thug.attacking = false;
          thug.x += 1;
          motions.play('walk', 'loop');
        } else if (dist < -25 && dist > -100) {
          thug.waiting = 0;
          thug.attacking = false;
          thug.x -= 1;
          motions.play('walk', 'loop');
        } else if (dist <= 25 && dist >= -25) {
          attack();
        } else {
          motions.stop();/*TODO
          if (Math.random() > 0.99) {
            motions.play('idle', 'stop');
          }*/
        }
      }
    },
    kill: function() {
      if (thug.alive) {
        thug.alive = false;
        x = motions;
        y = thug;
        motions.play('die', 'stop', 'thugDead');
      }
    }
  };
};

var ratsel = {
  init: function() {

  }
};