import { Scene } from 'phaser';
import logo from '../assets/images/DigiPokeLogoUpScale.png';
import VeemonWalk1 from '../assets/spritesheets/Veemon/Veemon_1.png';
import VeemonWalk2 from '../assets/spritesheets/Veemon/Veemon_2.png';
import VeemonStatic2 from '../assets/spritesheets/Veemon/Veemon_10.png';
import homeBackground from '../assets/images/HomeBackgroundMap.json';
import backgroundTileAsset from '../assets/images/pixel-cyberpunk-interior-resize.png';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        //this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
            //로딩씬 구현 관련
        });
    }

    preload ()
    {
        //  Stting path - Load the assets for the game - Replace with your own assets
        this.load.image('logo', logo);
        // Veemon Walk SpriteSheet individual image
        this.load.image('VeemonStatic', VeemonWalk1);
        this.load.image('VeemonStatic2', VeemonStatic2);
        this.load.image('VeemonWalk1', VeemonWalk1);
        this.load.image('VeemonWalk2', VeemonWalk2);
        // Playing Scene Home Background
        this.load.image("backgroundTile", backgroundTileAsset);
        this.load.tilemapTiledJSON('homeBackground', homeBackground);
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
        
        this.anims.create({
            key: 'VeemonWalk',
            frames: [
                { key: 'VeemonWalk1'},
                { key: 'VeemonWalk2'}
            ],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'VeemonWalkRandom',
            frames: [
                { key: 'VeemonWalk2'},
                { key: 'VeemonWalk1'}
            ],
            frameRate: 2
        })

        this.anims.create({
            key: 'VeemonStatic',
            frames: [
                { key: 'VeemonStatic2' },
                { key: 'VeemonStatic'}
            ],
            frameRate: 2
        });
    }
}
