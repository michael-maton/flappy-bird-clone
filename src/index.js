import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload,
    create,
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

let bird = null;

function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
}
