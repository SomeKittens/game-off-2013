
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
    this.george2Walk = animationFactory('george2walk');
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
    var self = this;
    george.init.call(self, canvas);
    stage.refresh();
  },
  exit: function() {
    console.log('exit');
  }
});