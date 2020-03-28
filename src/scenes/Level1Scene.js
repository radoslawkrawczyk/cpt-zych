import Phaser from 'phaser';
import cptZych from '../assets/gfx/cptZych.png';
import cptZychSmoke from '../assets/gfx/cptzych_smoke.png';
import backgroundBlank from '../assets/gfx/backgroundLevel1.png';
import cptZychBasicBullet from '../assets/gfx/cptZychBasicBullet.png';
import basicEnemyBullet from '../assets/gfx/basicEnemyBullet.png';
import CptZych from '../objects/CptZych';
import FirstEnemy from '../objects/FirstEnemy';
import basicEnemy from '../assets/gfx/basicEnemy.png';
import makeAnimations from '../utils/animations';


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
        this.load.spritesheet('basicEnemy', basicEnemy, {
            frameWidth: 200, frameHeight: 165
        });
        this.load.spritesheet('background', backgroundBlank, {
            frameWidth: 460, frameHeight: 650
        });
        this.load.image('cptzychBasicBullet', cptZychBasicBullet);
        this.load.image('basicEnemyBullet', basicEnemyBullet);
        this.load.spritesheet('cptzychSmoke', cptZychSmoke, { frameWidth: 200, frameHeight: 165 })
    }

    create() {
        this.mouse = this.input.mousePointer;
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.anims.create({
            key: 'animateBg',
            frames: this.anims.generateFrameNumbers('background', {
                start: 0,
                end: 3
            }),
            frameRate: 2,
            repeat: -1
        });

        makeAnimations(this);
        this.player = new CptZych(this, 220, 580);
        this.player.create();
        this.background.anims.play('animateBg');
        
        this.firstEnemy = new FirstEnemy(this, 170,50,'basicEnemy', {x: this.player.x, y: this.player.y});
        this.firstEnemy.create();

    }

    update(time) {
        this.player.update(time);
        this.firstEnemy.update(time);

    }
}

export default Level1Scene;