import { Scene } from 'phaser';
import player from '../characters/Player';

export class InGameHome extends Scene
{
    constructor ()
    {
        super('InGameHome');
    }

    create ()
    {
        this.map = this.make.tilemap({key: 'homeBackground'});
        this.tileset = this.map.addTilesetImage("homeBackgroundTileset1616", "backgroundTile", 16, 16);
        
        this.layers = [];

        this.layers.push(this.map.createLayer("Tile Layer 1", this.tileset, 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 2", this.tileset, 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 3", this.tileset, 0, 0));

        this.monster = new player(this);
    }

    update() 
    {

    }
}
