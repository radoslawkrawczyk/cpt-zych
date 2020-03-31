import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import Level1Scene from './scenes/Level1Scene';

const config = {
    type: Phaser.AUTO,
    width: 460,
    height: 650,
    backgroundColor: 'ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true,
            // debug: true

        }
    },
    scene: [MenuScene, Level1Scene]
}

const game = new Phaser.Game(config);