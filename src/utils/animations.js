export default function makeAnimations(scene) {
    scene.anims.create({
        key: 'enemyBasicShooting',
        frames: scene.anims.generateFrameNumbers('basicEnemy', {
            start: 1,
            end: 1
        }),
        frameRate: 60,
        repeat: 0
    });

    scene.anims.create({
        key: 'enemyBasicNormal',
        frames: scene.anims.generateFrameNumbers('basicEnemy', {
            start: 0,
            end: 0
        }),
        frameRate: 60,
        repeat: 0
    });
}