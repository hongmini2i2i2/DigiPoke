import Phaser from "phaser";

export const Direction = Object.freeze({
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
    static PLAYER_SPEED = 300;
    static RANDOM_PLAYER_SPEED = 500;

    constructor(scene) {
        super(scene, 110, 250, "VeemonStatic");
        this.scale = 1.6;
        this.alpha = 1;
        
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.isMoving = false;
        this.moveTimeout = null;

        //this.body.setSize(this.width * 0.5, this.height * 0.5);
        this.body.setOffset(this.width * 0.1, this.height * 0.8);



        this.setDrag(2000, 2000); // set resist, prevent sliding by velocity
        this.setMaxVelocity(Player.PLAYER_SPEED, Player.PLAYER_SPEED);
    }

    move(direction) {
        this.isMoving = true;
        this.anims.play('VeemonWalk', true);
        clearTimeout(this.moveTimeout);
        this.moveTimeout = null;

        switch (direction) {
            case Direction.Up:
                this.setVelocityY(-Player.PLAYER_SPEED);
                break;
            case Direction.Down:
                this.setVelocityY(Player.PLAYER_SPEED);
                break;
            case Direction.Left:
                this.setVelocityX(-Player.PLAYER_SPEED);
                this.flipX = false;
                break;
            case Direction.Right:
                this.setVelocityX(Player.PLAYER_SPEED);
                this.flipX = true;
                break;
        }
    }

    randomMove(direction) {
        this.anims.play('VeemonWalkRandom');
        switch (direction) {
            case Direction.Up:
                this.setVelocityY(-Player.RANDOM_PLAYER_SPEED);
                break;
            case Direction.Down:
                this.setVelocityY(Player.RANDOM_PLAYER_SPEED);
                break;
            case Direction.Left:
                this.setVelocityX(-Player.RANDOM_PLAYER_SPEED);
                this.flipX = false;
                break;
            case Direction.Right:
                this.setVelocityX(Player.RANDOM_PLAYER_SPEED);
                this.flipX = true;
                break;
        }
    }

    stop() {
        if (!this.moveTimeout) {
            this.isMoving = false;
            if (this.isMoving) return;

            this.setVelocity(0, 0);
            this.isMoving ? this.anims.stop() : null;

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
            }, 2000);
        }
    }
}