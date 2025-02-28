import Phaser from "phaser";

export const Direction = Object.freeze({
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
    static PLAYER_SPEED = 4;
    static RANDOM_PLAYER_SPEED = 20;

    constructor(scene) {
        super(scene, 110, 250, "VeemonStatic");
        this.scale = 1.8;
        this.alpha = 1;
        
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.isMoving = false;
        this.moveTimeout = null;
    }

    move(direction) {
        
        this.isMoving = true;
        clearTimeout(this.moveTimeout);
        this.moveTimeout = null;

        switch (direction) {
            case Direction.Up:
                this.anims.play('VeemonWalk', true);
                this.y -= Player.PLAYER_SPEED;
                break;
            case Direction.Down:
                this.anims.play('VeemonWalk', true);
                this.y += Player.PLAYER_SPEED;
                break;
            case Direction.Left:
                this.anims.play('VeemonWalk', true);
                this.x -= Player.PLAYER_SPEED;
                this.flipX = false;
                break;
            case Direction.Right:
                this.anims.play('VeemonWalk', true);
                this.x += Player.PLAYER_SPEED;
                this.flipX = true;
                break;
        }
    }

    randomMove(direction) {
        this.anims.play('VeemonWalkRandom');
        if(direction == Direction.Left){
            this.x -= Player.RANDOM_PLAYER_SPEED;
            this.flipX = false;
        } else {
            this.x += Player.RANDOM_PLAYER_SPEED;
            this.flipX = true;
        }
    }

    stop() { //움직이고 있는 상태이면 timeout삭제로직 추가
        if (!this.moveTimeout) {
            this.isMoving ? this.anims.stop() : null
            this.moveTimeout = setTimeout(() => {

                let randomAction = Phaser.Math.Between(0, 2);
            
                if(randomAction == 0) {
                    this.anims.play('VeemonStatic');
                }   else if (randomAction == 1) {
                    this.randomMove(Direction.Left);
                }   else {
                    this.randomMove(Direction.Right);
                }
    
                this.moveTimeout = null;
                this.isMoving = false;

            }
            , 1500);
        }
    }
}