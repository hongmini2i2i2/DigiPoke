import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
        super(scene, 960, 540, "VeemonStatic");
        this.scale = 1;
        this.alpha = 1;
        
        scene.add.existing(this);
        scene.add.existing(this);
    }

}