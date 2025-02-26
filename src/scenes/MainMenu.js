import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //this.add.image(512, 384, 'background');

        let logo = this.add.image(960, 450, 'logo');
        logo.setScale(0.2);

        this.add.text(960, 700, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('InGameHome');

        });
    }
}
