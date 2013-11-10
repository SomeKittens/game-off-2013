
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
      bg: 'img/b1mid.png',
      george2still: 'img/george2still.png',
      george2walk: 'img/george2walk.png',
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

    // Draw background first so it's in the back
    // HA!  Aren't I clever.
    self.bg = self.createElement();
    self.bg.drawImage('bg');
    stage.append(self.bg);

    self.george = self.createElement();
    self.george.drawImage('george2still');
    self.george.y = 165;
    self.george2Walk = animationFactory('george2walk');
    stage.append(self.george);
    self.george2Walk.add(self.george);

    self.enemy1 = self.createElement();
    self.enemy1.drawImage('enemy1still');
    self.enemy1Walk = animationFactory('enemy1walk');
    self.enemy1Walk.play('move', 'loop');
    enemy1.init.call(self);
    self.enemy1.x = 400;
    self.enemy1.y = 165;
    stage.append(self.enemy1);
  },
  render: function(stage) {
    var self = this;
    george.init.call(self, canvas);

    stage.refresh();
  },
  exit: function() {
    console.log('exit');
  }
});