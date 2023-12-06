import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
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
const TOWERS_TO_RENDER = 4;

let bird = null;
let towers = null;

const padding = 40;
const y_distance_between_towers = [150, 250];
const x_distance_between_towers = [400, 500];

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

  towers = this.physics.add.group();

  for (let i = 0; i < TOWERS_TO_RENDER; i++) {
    let top_tower = towers.create(0, 0, 'top_tower').setOrigin(0, 1);
    let bottom_tower = towers.create(0, 0, 'bottom_tower').setOrigin(0, 0);
    placeTowers(top_tower, bottom_tower);
  }

  towers.setVelocityX(-200);

  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  this.input.on('pointerdown', flap);
  spaceBar.on('down', flap);
}

const flap = () => {
  bird.body.velocity.y = -FLAPVELOCITY;
};

const placeTowers = (top_tower, bottom_tower) => {
  const right_tower_x = getRightTower();

  const tower_vertical_distance = Phaser.Math.Between(...y_distance_between_towers);
  const tower_vertical_position = Phaser.Math.Between(padding, config.height - padding - tower_vertical_distance);
  const tower_horizontal_distance = Phaser.Math.Between(...x_distance_between_towers);

  top_tower.x = right_tower_x + tower_horizontal_distance;
  top_tower.y = tower_vertical_position;

  bottom_tower.x = top_tower.x;
  bottom_tower.y = top_tower.y + tower_vertical_distance;
};

const recycleTowers = () => {
  const temp_tower = [];
  towers.getChildren().forEach((tower) => {
    if (tower.getBounds().right <= 0) {
      temp_tower.push(tower);

      if (temp_tower.length === 2) {
        placeTowers(...temp_tower);
      }
    }
  });
};

const getRightTower = () => {
  let right_tower = 0;

  towers.getChildren().forEach((tower) => {
    right_tower = Math.max(tower.x, right_tower);
  });

  return right_tower;
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

  recycleTowers();
}
