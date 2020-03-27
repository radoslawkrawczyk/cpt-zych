import Phaser from 'phaser';


class CptZych extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'cptZych')
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.playerSpeed = 200;
        this.playerDiagonalSpeed = this.playerSpeed * (1 / 1.44);
        this.keyZ;
        this.lastShot = 0;
    }

    create() {
        this.player = this;
        this.player.scaleX = .5;
        this.player.scaleY = .5;

        this.input = this.scene.input.keyboard.createCursorKeys();
        this.keyZ = this.scene.input.keyboard.addKey('Z');


        this.playerSmoke = this.scene.add.sprite(0, 0, 'cptzychSmoke').setScale(0.2, 0.2);



        this.playerSmoke.alpha = 0;

        this.scene.anims.create({
            key: 'movingSmoke',
            frames: this.scene.anims.generateFrameNumbers('cptzychSmoke', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.fireBasicSkill = () => {
            const basicBullet = this.scene.physics.add.image(this.player.x, this.player.y, 'cptzychBasicBullet').setScale(.3, .3);
            basicBullet.rotation = 90;
            basicBullet.setVelocityY(-500);
            this.scene.time.addEvent({
                callback: () => {
                    basicBullet.destroy();
                },
                delay: 2000,
                callbackScope: this,
                loop: false
            })
        }
        this.player.setCollideWorldBounds(true);
    }


    update(time) {
        if (this.input.left.isDown && !this.input.right.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
            this.playerSmoke.x = this.player.x + 60;
            this.playerSmoke.y = this.player.y + 20;
            this.playerSmoke.rotation = 0;

            this.playerSmoke.anims.play('movingSmoke', true);
            this.playerSmoke.alpha += 0.1;
        }
        if (this.input.right.isDown && !this.input.left.isDown) {
            this.player.setVelocityX(this.playerSpeed);
            this.playerSmoke.x = this.player.x - 60;
            this.playerSmoke.y = this.player.y + 10;
            this.playerSmoke.rotation = 0;
            this.playerSmoke.anims.play('movingSmoke', true);
            this.playerSmoke.alpha += 0.1;
        }
        if (this.input.up.isDown && !this.input.down.isDown) {

            this.player.setVelocityY(-this.playerSpeed);
            this.playerSmoke.x = this.player.x;
            this.playerSmoke.y = this.player.y + 60;
            this.playerSmoke.rotation = 80;
            this.playerSmoke.anims.play('movingSmoke', true);
            this.playerSmoke.alpha += 0.1;
        }
        if (this.input.down.isDown && !this.input.up.isDown) {

            this.player.setVelocityY(this.playerSpeed);
            this.playerSmoke.x = this.player.x;
            this.playerSmoke.y = this.player.y - 50;
            this.playerSmoke.rotation = 80;
            this.playerSmoke.anims.play('movingSmoke', true);
            this.playerSmoke.alpha += 0.1;

        }

        if (this.input.right.isDown && this.input.up.isDown) {
            this.player.body.setVelocityX(this.playerDiagonalSpeed)
            this.player.body.setVelocityY(-this.playerDiagonalSpeed)
        }

        if (this.input.right.isDown && this.input.down.isDown) {
            this.player.body.setVelocityX(this.playerDiagonalSpeed)
            this.player.body.setVelocityY(this.playerDiagonalSpeed)
        }

        if (this.input.down.isDown && this.input.left.isDown) {
            this.player.body.setVelocityX(-this.playerDiagonalSpeed)
            this.player.body.setVelocityY(this.playerDiagonalSpeed)
        }

        if (this.input.left.isDown && this.input.up.isDown) {
            this.player.body.setVelocityX(-this.playerDiagonalSpeed)
            this.player.body.setVelocityY(-this.playerDiagonalSpeed)
        }

        if (this.input.left.isUp && this.input.right.isUp) {
            this.player.setVelocityX(0);

            this.playerSmoke.alpha -= .08;
        }
        if (this.input.up.isUp && this.input.down.isUp) {
            this.player.setVelocityY(0);

            this.playerSmoke.alpha -= .08;
        }
        if (this.input.up.isUp && this.input.down.isUp && this.input.left.isUp && this.input.right.isUp) {
            this.playerSmoke.anims.stop();

        }

        if (this.keyZ.isDown && time > this.lastShot) {
            this.fireBasicSkill();
            this.lastShot = time + 150;
        }
    }
}

export default CptZych;