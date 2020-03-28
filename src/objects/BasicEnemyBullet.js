import Phaser from 'phaser';

export default class BasicEnemyBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.playerX = this.scene.player.x;
        this.playerY = this.scene.player.y;

    }

    create() {
        this.setRotation(Phaser.Math.Between(0, 6));
        this.body.setCircle(12, 2, 2)
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 20, 3000);
        this.scene.physics.add.collider(this,this.scene.worldColliderBottom, (enemy, collider) => { enemy.destroy(); collider.body.setVelocity(0,0)})
        this.scene.physics.add.collider(this,this.scene.worldColliderTop, (enemy, collider) => { enemy.destroy(); collider.body.setVelocity(0,0)})
        this.scene.physics.add.collider(this,this.scene.worldColliderRight, (enemy, collider) => { enemy.destroy(); collider.body.setVelocity(0,0)})
        this.scene.physics.add.collider(this,this.scene.worldColliderTop, (enemy, collider) => { enemy.destroy(); collider.body.setVelocity(0,0)})
        
        this.scene.physics.add.collider(this,this.scene.player, (bullet, player, scene = this.scene) => { 
            bullet.destroy();
            scene.cameras.main.shake(200); 
            player.hp -= 1;

        })
    }

    update() {

    }
}