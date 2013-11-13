
var canvas = CE.defines('canvas')
  .extend(Input)
  .extend(Hit)
  .extend(Animation)
  .extend(Scrolling)
  .ready(function() {
  canvas.Scene.call('level1');
});

canvas.Scene.new({
  name: 'level1',
  materials: {
    images: {
      bg0: 'img/b1back.png',
      bg1: 'img/b1mid.png',
      george2still: 'img/george2still.png',
      george2sprites: 'img/george2.png',
      thugStill: 'img/thugstill.png',
      thugSprites: 'img/thug.png',
      enemy1still: 'img/enemy1still.png',
      enemy1walk: 'img/enemy1walk.png'
    }
  },
  preload: function(stage, pourcent) {
    console.log('preloaded');
    console.log(pourcent);
  },
  ready: function(stage) {
    var self = this;
    console.log('ready');

    // Variables that are used in render but need defaults
    self.jumping = false;
    self.intervals = {};
    self.scrolling = canvas.Scrolling.new(self, 512, 256);
    self.thugs = [];

    // Draw background first so it's in the back
    // HA!  Aren't I clever.
    self.bg0 = self.createElement();
    self.bg0.drawImage('bg0');
    stage.append(self.bg0);

    self.george = self.createElement();
    self.george.drawImage('george2still');
    self.george2Walk = animationFactory.generate('george2');
    self.george2Walk.add(self.george);

    self.george.y = 165;
    self.scrolling.setMainElement(self.george);

    var testThug = Thug.init.call(self, 300, 165);
    self.thugs.push(testThug);

    var foreground = self.createElement();
    foreground.drawImage('bg1');
    foreground.append(self.george);
    self.thugs.forEach(function(thug) {
      foreground.append(thug.el);
    })
    self.scrolling.addScroll({
       element: foreground,
       speed: 2,
       block: true,
       width: 2048,
       height: 256
    });
    stage.append(foreground);

    
    /*
    self.enemy1 = self.createElement();
    self.enemy1.drawImage('enemy1still');
    self.enemy1Walk = animationFactory.generate('enemy1walk');
    self.enemy1Walk.play('move', 'loop');
    enemy1.init.call(self);
    self.enemy1.x = 400;
    self.enemy1.y = 165;
    stage.append(self.enemy1);
    */

  },
  render: function(stage) {
    var self = this;
    george.init.call(self, canvas);
    self.thugs.forEach(function(thug) {
      thug.update.call(self);
    });
    self.scrolling.update();
    stage.refresh();
  },
  exit: function() {
    console.log('exit');
  }
});