import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

let bird = null;
let top_pipe = null;
let bottom_pipe = null;
const flapVELOCITY = 250;
const initialPOSITION = { x: config.width / 10, y: config.height / 2 };

function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');

  bird = this.physics.add
    .sprite(initialPOSITION.x, initialPOSITION.y, 'bird')
    .setOrigin(0);
  bird.body.gravity.y = 400;

  top_pipe = this.physics.add.sprite(400, 100, 'pipe').setOrigin(0, 1);

  bottom_pipe = this.physics.add
    .sprite(400, top_pipe.y + 100, 'pipe')
    .setOrigin(0, 0);

  var spaceBar = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  this.input.on('pointerdown', flap);
  spaceBar.on('down', flap);
}

const flap = () => {
  bird.body.velocity.y = -flapVELOCITY;
};

const restart = () => {
  bird.x = initialPOSITION.x;
  bird.y = initialPOSITION.y;
  bird.body.velocity.y = 0;
};

function update(time, delta) {
  if (bird.y < 0 || bird.y > config.height - bird.height) {
    restart();
  }
}
