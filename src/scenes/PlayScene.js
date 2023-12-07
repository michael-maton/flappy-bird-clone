import Phaser from 'phaser';

const TOWERS_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.bird = null;
    this.towers = null;
    this.flap_velocity = 250;
    this.y_distance_between_towers = [150, 250];
    this.x_distance_between_towers = [400, 500];
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('top_tower', 'assets/tower3.png');
    this.load.image('bottom_tower', 'assets/tower2.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);
    this.bird = this.physics.add.sprite(this.config.initial_position.x, this.config.initial_position.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 400;

    this.towers = this.physics.add.group();

    for (let i = 0; i < TOWERS_TO_RENDER; i++) {
      const top_tower = this.towers.create(0, 0, 'top_tower').setOrigin(0, 1);
      const bottom_tower = this.towers.create(0, 0, 'bottom_tower').setOrigin(0, 0);
      this.placeTowers(top_tower, bottom_tower);
    }

    this.towers.setVelocityX(-200);

    this.input.on('pointerdown', this.flap, this);
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on('down', this.flap, this);
  }

  update() {
    if (this.bird.y > this.config.height || this.bird.y < -this.bird.height) {
      this.restart();
    }

    this.recycleTowers();
  }

  flap() {
    this.bird.body.velocity.y = -this.flap_velocity;
  }

  placeTowers(top_tower, bottom_tower) {
    const right_tower_x = this.getRightTower();

    const tower_vertical_distance = Phaser.Math.Between(...this.y_distance_between_towers);
    const tower_vertical_position = Phaser.Math.Between(0 + 40, this.config.height - 40 - tower_vertical_distance);
    const tower_horizontal_distance = Phaser.Math.Between(...this.x_distance_between_towers);

    top_tower.x = right_tower_x + tower_horizontal_distance;
    top_tower.y = tower_vertical_position;

    bottom_tower.x = top_tower.x;
    bottom_tower.y = top_tower.y + tower_vertical_distance;
  }

  getRightTower() {
    let right_tower = 0;

    this.towers.getChildren().forEach((tower) => {
      right_tower = Math.max(tower.x, right_tower);
    });

    return right_tower;
  }

  recycleTowers() {
    const temp_towers = [];
    this.towers.getChildren().forEach((tower) => {
      if (tower.getBounds().right <= 0) {
        temp_towers.push(tower);

        if (temp_towers.length === 2) {
          this.placeTowers(...temp_towers);
        }
      }
    });
  }

  restart() {
    this.bird.x = this.config.initial_position.x;
    this.bird.y = this.config.initial_position.y;
    this.bird.body.velocity.y = 0;
  }
}

export default PlayScene;
