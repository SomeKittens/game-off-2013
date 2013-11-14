
var canvas = CE.defines('canvas', {
  soundmanager: {
    url: 'extends/swf/',
    debugMode: false
  }
})
  .extend(Input)
  .extend(Hit)
  .extend(Animation)
  .extend(Scrolling)
  .extend(Tiled)
  //.extend(Sound)
  .ready(function() {
  canvas.Scene.call('level1');
});

canvas.Scene.new({
  name: 'level1',
  materials: {
    images: {
      bg: 'img/bg/test.png',
      george2still: 'img/george2still.png',
      george2sprites: 'img/george2.png',
      thugStill: 'img/thugstill.png',
      thugDead: 'img/thugdead.png',
      thugSprites: 'img/thug.png',
      enemy1still: 'img/enemy1still.png',
      enemy1walk: 'img/enemy1walk.png'
    }
  },
  preload: function(stage, pourcent) {
    console.log(pourcent);
  },
  ready: function(stage) {
    var self = this;
    console.log('ready');
    // Variables that are used in render but need defaults
    self.jumping = false;
    self.intervals = {};
    self.scrolling = canvas.Scrolling.new(self, 64, 64);
    self.thugs = [];

    self.george = George.call(self, 10, 1667);
    self.scrolling.setMainElement(self.george.el);
    var testThug = Thug.call(self, 100, 1667);
    var testThug0 = Thug.call(self, 400, 1667);
    var testThug1 = Thug.call(self, 350, 1667);
    var testThug2 = Thug.call(self, 300, 1667);
    var testThug3 = Thug.call(self, 250, 1667);
    self.thugs.push(testThug);
    self.thugs.push(testThug0);
    self.thugs.push(testThug1);
    self.thugs.push(testThug2);
    self.thugs.push(testThug3);

    var foreground = self.createElement();
    foreground.drawImage('bg');
    foreground.append(self.george.el);
    self.thugs.forEach(function(thug) {
      foreground.append(thug.el);
    });
    self.scrolling.addScroll({
       element: foreground,
       speed: 2,
       block: true,
       width: 2560,
       height: 1764
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