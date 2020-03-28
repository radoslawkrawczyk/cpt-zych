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
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 20, 3000);
    }

    update() {

    }
}