import Phaser from 'phaser';

class BasicEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'basicEnemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.hp = 25;
        this.lastShot = 0;
    }
    create() {
        this.scaleX = .5;
        this.scaleY = .5;
    }
}

export default BasicEnemy;