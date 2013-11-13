
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

    self.george = George.call(self, 0, 165);
    console.log(self.george);
    self.scrolling.setMainElement(self.george.el);

    var testThug = Thug.call(self, 100, 165);
    var testThug2 = Thug.call(self, 400, 165);
    self.thugs.push(testThug);
    self.thugs.push(testThug2);

    var foreground = self.createElement();
    foreground.drawImage('bg1');
    foreground.append(self.george.el);
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
  },
  render: function(stage) {
    var self = this;
    self.george.update.call(self, canvas);
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