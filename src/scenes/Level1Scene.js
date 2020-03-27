import Phaser from 'phaser';
import cptZych from '../assets/gfx/cptZych.png';
import cptZychSmoke from '../assets/gfx/cptzych_smoke.png';
import backgroundBlank from '../assets/gfx/backgroundBlank.png';
import cptZychBasicBullet from '../assets/gfx/cptZychBasicBullet.png';
import CptZych from '../objects/CptZych';


const gameState = {
};


class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'level1scene' });
        this.playerSpeed = 200;
        this.playerDiagonalSpeed = this.playerSpeed * (1 / 1.44);
        this.keyZ;
        this.lastShot = 0;
    }

    preload() {
        this.load.image('cptZych', cptZych);
        this.load.image('background', backgroundBlank);
        this.load.image('cptzychBasicBullet', cptZychBasicBullet);
        this.load.spritesheet('cptzychSmoke', cptZychSmoke, { frameWidth: 200, frameHeight: 165 })
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.player = new CptZych(this, 220, 580);
        this.player.create();
      
    }

    update(time) {
        this.player.update(time);
    }
}

export default Level1Scene;