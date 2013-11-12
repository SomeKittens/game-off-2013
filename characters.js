var george = {
  init: function(canvas) {
    var self = this
      , g = gameVars.george;
    if (g.activatePortals) {
      self.george2Walk = animationFactory('george2sprites', true);
      self.george2Walk.add(self.george);
      g.activatePortals = false;
    }
    canvas.Input.keyDown(Input.Right, function() {
      if (!self.intervals.walkingRight) {
        self.intervals.walkingRight = setInterval(function() {
          self.george.x += g.moveSpace;
        }, g.moveTime);
      }
      if (!self.jumping) {
        self.george2Walk.play('move', 'loop');
      }
    });
    canvas.Input.keyDown(Input.Left, function() {
      if (!self.intervals.walkingLeft) {
        self.intervals.walkingLeft = setInterval(function() {
          self.george.x -= g.moveSpace;
        }, g.moveTime);
      }
      if (!self.jumping) {
        self.george2Walk.play('move', 'loop');
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

    // Attacking
    canvas.Input.keyDown(Input.A, function() {
      self.george2Walk.stop();
      self.george2Walk.play('attack0', 'stop');
    });

    canvas.Input.keyDown(Input.Up, function() {
      if (self.jumping) {
        return;
      }
      self.jumping = true;
      self.george2Walk.stop();
      var goUp = function() {
        if (self.george.y > (165 - g.jumpHeight)) {
          setTimeout(goUp, g.jumpIntervalTime);
        } else {
          setTimeout(goDown, g.jumpIntervalTime);
        }
        self.george.y -= g.jumpSpace;
      };
      var goDown = function() {
        if (self.george.y < 165) {
          setTimeout(goDown, g.jumpIntervalTime);
          self.george.y += g.jumpSpace;
        } else {
          self.jumping = false;
          if (canvas.Input.isPressed([Input.Left, Input.Right])) {
            self.george2Walk.play('move', 'loop');
          } else {
            self.george.drawImage('george2still');
          }
        }
      };
      goUp();
    });
  }
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

var ratsel = {
  init: function() {

  }
}