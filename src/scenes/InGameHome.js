import { Scene } from 'phaser';

export class InGameHome extends Scene
{
    constructor ()
    {
        super('InGameHome');
    }

    create ()
    {
        this.map = this.make.tilemap({key: 'homeBackground', tileWidth: 16, tileHeight: 16});
        this.tileset1 = this.map.addTilesetImage("home background", "backgroundTile");
        this.tileset2 = this.map.addTilesetImage("pixel-cyberpunk-interior", "backgroundTile", 16, 16, 3, 0);
        
        this.layers = [];

        this.layers.push(this.map.createLayer("Tile Layer 1", [this.tileset1, this.tileset2], 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 2", [this.tileset1, this.tileset2], 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 3", [this.tileset1, this.tileset2], 0, 0));

        this.layers.forEach(layer => {layer.setScale(0.6);});
    }

    update() 
    {

    }
}
