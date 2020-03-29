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

        this.score = 0;
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
        this.scoreText = this.add.text(350, 40, 'Pts:' + this.score, { fontSize: '20px', color: '000000' })
        makeAnimations(this);
        this.player = new CptZych(this, 220, 580);
        this.player.create();
        this.background.anims.play('animateBg');

        this.worldColliderTop = this.add.rectangle(0, -20, 480, 15).setOrigin(0, 0);
        this.worldColliderBottom = this.add.rectangle(0, 680, 460, 15).setOrigin(0, 0);
        this.worldColliderLeft = this.add.rectangle(-20, 0, 15, 670).setOrigin(0, 0);
        this.worldColliderRight = this.add.rectangle(480, 0, 15, 670).setOrigin(0, 0);

        this.physics.add.existing(this.worldColliderBottom);
        this.physics.add.existing(this.worldColliderTop);
        this.physics.add.existing(this.worldColliderLeft);
        this.physics.add.existing(this.worldColliderRight);

        this.basicEnemy = this.add.group();

        this.time.addEvent({
            callback: () => {

                let xArray = [
                    55,
                    140,
                    230,
                    320,
                    410
                ];
                const howManyEnemies = Phaser.Math.Between(0,4);

                for (let i = 0; i <= howManyEnemies; i++) {
                    let x = Phaser.Math.Between(0, xArray.length - 1);
                    this.newEnemy = new FirstEnemy(this, xArray[x], 10, 'basicEnemy', { x: this.player.x, y: this.player.y });
                    this.newEnemy.create();

                    this.basicEnemy.add(this.newEnemy);
                    this.physics.add.collider(this.basicEnemy, this.worldColliderBottom, (enemy, collider) => {
                        enemy.timer.remove(); enemy.destroy(); collider.body.setVelocity(0, 0)
                    });

                    xArray.splice(x, 1);
                }
            },
            delay: 4000,
            callbackScope: true,
            loop: true
        })

    }

    update(time) {
        this.player.update(time);
        // this.basicEnemy.children.iterate(function (child) {

        //     console.log(child.hp)

        // });
    }
}

export default Level1Scene;