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
        this.anims.play('VeemonWalk', true);
        clearTimeout(this.moveTimeout);
        this.moveTimeout = null;

        switch (direction) {
            case Direction.Up:
                this.y -= Player.PLAYER_SPEED;
                break;
            case Direction.Down:
                this.y += Player.PLAYER_SPEED;
                break;
            case Direction.Left:
                this.x -= Player.PLAYER_SPEED;
                this.flipX = false;
                break;
            case Direction.Right:
                this.x += Player.PLAYER_SPEED;
                this.flipX = true;
                break;
        }
    }

    randomMove(direction) {
        this.anims.play('VeemonWalkRandom');
        switch (direction) {
            case Direction.Up:
                this.y -= Player.RANDOM_PLAYER_SPEED;
                break;
            case Direction.Down:
                this.y += Player.RANDOM_PLAYER_SPEED;
                break;
            case Direction.Left:
                this.x -= Player.RANDOM_PLAYER_SPEED;
                this.flipX = false;
                break;
            case Direction.Right:
                this.x += Player.RANDOM_PLAYER_SPEED;
                this.flipX = true;
                break;
        }
    }

    stop() {
        if (!this.moveTimeout) {
            this.isMoving = false;
            if (this.isMoving) return; // if the status is ismoving, do not start this.
            this.isMoving ? this.anims.stop() : null // stop the former anims
            this.moveTimeout = setTimeout(() => {

                let randomAction = Phaser.Math.Between(0, 4);
            
                switch (randomAction) {
                    case 0: 
                        this.anims.play('VeemonStatic');
                        break;
                    case 1:
                        this.randomMove(Direction.Left);
                        break;
                    case 2:
                        this.randomMove(Direction.Right);
                        break;
                    case 3:
                        this.randomMove(Direction.Up);
                        break;
                    case 4:
                        this.randomMove(Direction.Down);
                        break;
                }

                this.moveTimeout = null;

            }
            , 1500);
        }
    }
}