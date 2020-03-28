import BasicEnemy from './BasicEnemy';
import BasicEnemyBullet from './BasicEnemyBullet';

class FirstEnemy extends BasicEnemy {
    constructor(scene, x, y, sprite, playerData) {
        super(scene, x, y, sprite, playerData);
        this.playerData = playerData;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.fireRate = 1500;
        this.lastShot = 0;

        this.justCreated = true;
        this.normalAnimation = true;
        this.bullets = []
    }


    create() {
        BasicEnemy.prototype.create();
console.log(this.playerData.x);
        this.setVelocityY(50);

        let shootingTimer = 0;

        this.scene.time.addEvent({
            callback: () => {
                if (shootingTimer <= 2) {
                    this.anims.play('enemyBasicNormal');

                }
                if (shootingTimer > 2 && shootingTimer <= 6) {
                    this.anims.play('enemyBasicShooting');
                    const bullet = (new BasicEnemyBullet(this.scene, this.x, this.y, 'basicEnemyBullet'))
                    bullet.create();
                    this.scene.physics.moveTo(bullet, this.scene.player.x, this.scene.player.y)
                }

                shootingTimer++;
                if (shootingTimer > 6) {
                    shootingTimer = 0;
                }

            },
            delay: 1000,
            callbackScope: this.scene,
            loop: true
        });
    }


    update(time) {
        // console.log(this.bullets);

    }

}

export default FirstEnemy;