import Phaser from 'phaser';
import cptZych from '../assets/gfx/cptZych.png';
import cptZychSmoke from '../assets/gfx/cptzych_smoke.png';
import backgroundBlank from '../assets/gfx/backgroundBlank.png';
import cptZychBasicBullet from '../assets/gfx/cptZychBasicBullet.png';


const gameState = {
    playerSpeed: 200,
    
    playerHealth: 300,
    lastShot: 0,


    mapMinX: 55,
    mapMaxX: 380
};


class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'level1scene' });
        this.playerDiagonalSpeed = gameState.playerSpeed * (1/1.44);
        this.keyZ;
    }

    preload() {
        this.load.image('cptzych', cptZych);
        this.load.image('background', backgroundBlank);
        this.load.image('cptzychBasicBullet', cptZychBasicBullet);
        this.load.spritesheet('cptzychSmoke', cptZychSmoke, { frameWidth: 200, frameHeight: 165 })
    }

    create() {
        this.add.image(0,0, 'background').setOrigin(0,0);

        gameState.player = this.physics.add.sprite(220, 580, 'cptzych');
        gameState.player.scaleX = .5;
        gameState.player.scaleY = .5;

        gameState.input = this.input.keyboard.createCursorKeys();
        this.keyZ  = this.input.keyboard.addKey('Z');


        gameState.playerSmoke =  this.add.sprite(0, 0, 'cptzychSmoke').setScale(0.2, 0.2);

        

        gameState.playerSmoke.alpha = 0;

        this.anims.create({
            key: 'movingSmoke',
            frames: this.anims.generateFrameNumbers('cptzychSmoke', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

         gameState.fireBasicSkill = () => {
            const basicBullet = this.physics.add.image(gameState.player.x, gameState.player.y, 'cptzychBasicBullet').setScale(.3,.3);
            basicBullet.rotation = 90;
            basicBullet.setVelocityY(-500);
            this.time.addEvent({
                callback: () => {
                    basicBullet.destroy();
                },
                delay: 2000,
                callbackScope: this,
                loop: false
            })
        }
        gameState.player.setCollideWorldBounds(true);
    }

    update(time) {
        if (gameState.input.left.isDown && !gameState.input.right.isDown) {
            gameState.player.setVelocityX(-gameState.playerSpeed);
            gameState.playerSmoke.x = gameState.player.x + 60;
            gameState.playerSmoke.y = gameState.player.y + 20;
            gameState.playerSmoke.rotation = 0;

            gameState.playerSmoke.anims.play('movingSmoke', true);
            gameState.playerSmoke.alpha += 0.1;
        }
         if (gameState.input.right.isDown && !gameState.input.left.isDown) {
            gameState.player.setVelocityX(gameState.playerSpeed);
            gameState.playerSmoke.x = gameState.player.x - 60;
            gameState.playerSmoke.y = gameState.player.y + 10;
            gameState.playerSmoke.rotation = 0;
            gameState.playerSmoke.anims.play('movingSmoke', true);
            gameState.playerSmoke.alpha += 0.1;
        }
         if (gameState.input.up.isDown && !gameState.input.down.isDown) {

            gameState.player.setVelocityY(-gameState.playerSpeed);
            gameState.playerSmoke.x = gameState.player.x;
            gameState.playerSmoke.y = gameState.player.y + 60;
            gameState.playerSmoke.rotation = 80;
            gameState.playerSmoke.anims.play('movingSmoke', true);
            gameState.playerSmoke.alpha += 0.1;
        }
         if (gameState.input.down.isDown && !gameState.input.up.isDown) {

            gameState.player.setVelocityY(gameState.playerSpeed);
            gameState.playerSmoke.x = gameState.player.x;
            gameState.playerSmoke.y = gameState.player.y - 50;
            gameState.playerSmoke.rotation = 80;
            gameState.playerSmoke.anims.play('movingSmoke', true);
            gameState.playerSmoke.alpha += 0.1;

        }

        if (gameState.input.right.isDown && gameState.input.up.isDown) {
            gameState.player.body.setVelocityX(this.playerDiagonalSpeed)
            gameState.player.body.setVelocityY(-this.playerDiagonalSpeed)
        }

        if (gameState.input.right.isDown && gameState.input.down.isDown) {
            gameState.player.body.setVelocityX(this.playerDiagonalSpeed)
            gameState.player.body.setVelocityY(this.playerDiagonalSpeed)
        }

        if (gameState.input.down.isDown && gameState.input.left.isDown) {
            gameState.player.body.setVelocityX(-this.playerDiagonalSpeed)
            gameState.player.body.setVelocityY(this.playerDiagonalSpeed)
        }

        if (gameState.input.left.isDown && gameState.input.up.isDown) {
            gameState.player.body.setVelocityX(-this.playerDiagonalSpeed)
            gameState.player.body.setVelocityY(-this.playerDiagonalSpeed)
        }

        if (gameState.input.left.isUp && gameState.input.right.isUp) {
            gameState.player.setVelocityX(0);

            gameState.playerSmoke.anims.stop();
            gameState.playerSmoke.alpha -= .08;
        }
        if (gameState.input.up.isUp && gameState.input.down.isUp) {
            gameState.player.setVelocityY(0);

            gameState.playerSmoke.anims.stop();
            gameState.playerSmoke.alpha -= .08;
        }

        if (this.keyZ.isDown && time > gameState.lastShot){
            gameState.fireBasicSkill();
            gameState.lastShot = time + 150;
        }
    }
}

export default Level1Scene;