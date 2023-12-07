import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene.js';

const WIDTH = 1000;
const HEIGHT = 600;
const POSITION = { x: WIDTH / 10, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  initial_position: POSITION,
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)],
};

new Phaser.Game(config);
