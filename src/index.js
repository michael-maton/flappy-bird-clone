import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
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
}

let bird = null;
const flapVELOCITY = 250;

function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');
  bird = this.physics.add
    .sprite(config.width / 10, config.height / 2, 'bird')
    .setOrigin(0);

  var spaceBar = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  this.input.on('pointerdown', flap);
  spaceBar.on('down', flap);
}

const flap = () => {
  bird.body.velocity.y = -flapVELOCITY;
};

function update(time, delta) {}
