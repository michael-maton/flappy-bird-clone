import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 1000,
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

const FLAPVELOCITY = 250;
const INITIALPOSITION = { x: config.width / 10, y: config.height / 2 };
const PIPES_TO_RENDER = 40;

let bird = null;
let pipe_x_distance = 0;

const padding = 40;
const pvd_range = [150, 250];

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('top_tower', 'assets/tower3.png');
  this.load.image('bottom_tower', 'assets/tower2.png');
}

function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');

  bird = this.physics.add.sprite(INITIALPOSITION.x, INITIALPOSITION.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    let top_tower = this.physics.add.sprite(0, 0, 'top_tower').setOrigin(0, 1);
    let bottom_tower = this.physics.add.sprite(0, 0, 'bottom_tower').setOrigin(0, 0);
    placePipes(top_tower, bottom_tower);
  }

  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  this.input.on('pointerdown', flap);
  spaceBar.on('down', flap);
}

const flap = () => {
  bird.body.velocity.y = -FLAPVELOCITY;
};

const placePipes = (top_tower, bottom_tower) => {
  pipe_x_distance += 400;

  let tower_vertical_distance = Phaser.Math.Between(...pvd_range);
  let tower_vertical_position = Phaser.Math.Between(padding, config.height - padding - tower_vertical_distance);

  top_tower.x = pipe_x_distance;
  top_tower.y = tower_vertical_position;

  bottom_tower.x = top_tower.x;
  bottom_tower.y = top_tower.y + tower_vertical_distance;

  top_tower.body.velocity.x = -200;
  bottom_tower.body.velocity.x = -200;
};

const restart = () => {
  bird.x = INITIALPOSITION.x;
  bird.y = INITIALPOSITION.y;
  bird.body.velocity.y = 0;
};

function update(time, delta) {
  if (bird.y < 0 || bird.y > config.height - bird.height) {
    restart();
  }
}
