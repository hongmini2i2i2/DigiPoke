import { Scene } from 'phaser';
import player, { Direction } from '../characters/Player';

export class InGameHome extends Scene
{
    constructor ()
    {
        super('InGameHome');
    }

    create ()
    {
        this.map = this.make.tilemap({key: 'homeBackground'});
        this.tileset = this.map.addTilesetImage("HomeBackgroundTileset3232", "backgroundTile", 32, 32, 0, 0);
        
        this.layers = [];

        this.layers.push(this.map.createLayer("Tile Layer 1", this.tileset, 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 2", this.tileset, 0, 0));
        this.layers.push(this.map.createLayer("Tile Layer 3", this.tileset, 0, 0));
        
        this.layers.forEach(layer => {
            layer.setCollisionByProperty({ collide: true }); 
        });

        this.cursorKeys = this.input.keyboard.createCursorKeys(); //arrow key
        this.wasdKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W, 
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
        ///////set player and physics//////
        this.Player = new player(this);
        this.Player.anims.play('VeemonStatic');

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.layers.forEach(layer => {
            this.physics.add.collider(this.Player, layer);
        });

        ///////load tileset and interact with tilesets//////
        this.interactiveTileSets = [];
        this.interactiveTileSetsNearBy = [];
        this.nameTags = []; //interactive tile's action name

        this.layers.forEach(layer => {
            layer.forEachTile(tile => {
                if (tile.properties && tile.properties.interactive) {
                    this.interactiveTileSets.push({
                        tile: tile,
                        x: tile.getCenterX(),
                        y: tile.getCenterY(),
                        action: tile.properties.action
                    });
                }
            });
        });

        console.log(this.interactiveTileSets);
        console.log(this.Player.x, this.Player.y);
    }
    update() 
    {
        this.movePlayerManager();
        this.interactiveTileManager();
        this.addNameTag();
        //console.log(this.interactiveTileSetsNearBy);
    }
    ///////Methods///////
    movePlayerManager() {
        let isMoving = false;
    
        if (this.cursorKeys.left.isDown || this.wasdKeys.left.isDown) {
            this.Player.move(Direction.Left);
            isMoving = true;
        } else if (this.cursorKeys.right.isDown || this.wasdKeys.right.isDown) {
            this.Player.move(Direction.Right);
            isMoving = true;
        }
    
        if (this.cursorKeys.up.isDown || this.wasdKeys.up.isDown) {
            this.Player.move(Direction.Up);
            isMoving = true;
        } else if (this.cursorKeys.down.isDown || this.wasdKeys.down.isDown) {
            this.Player.move(Direction.Down);
            isMoving = true;
        }
    
        if (!isMoving) {
            this.Player.stop();
        }
    }

    interactiveTileManager() {
        this.interactiveTileSetsNearBy.length = 0;

        this.interactiveTileSets.forEach( tile => {
            if ( 
                ( (0 < this.Player.x - tile.x && this.Player.x - tile.x < 30) ||
                  (0 < tile.x - this.Player.x && tile.x - this.Player.x < 30) )  && 
                ( (0 < this.Player.y - tile.y && this.Player.y - tile.y < 30) ||
                  (0 < tile.y - this.Player.y && tile.y - this.Player.y < 30) ) 
            ) {
                this.interactiveTileSetsNearBy.push({
                    x: tile.x,
                    y: tile.y,
                    action: tile.action
                });
            }
        });

        // no nearby interactive tile == hide nametag
        if(this.interactiveTileSetsNearBy.length === 0) {
            this.nameTags.length = 0;
            if(this.nameTag) { //only when the nametag is exist
                this.nameTag.setVisible(false);
            }
        }
    }

    addNameTag() {

        if (this.interactiveTileSetsNearBy.length === 0) {
            if (this.nameTag) {
                this.nameTag.setVisible(false);
            }
            this.nameTags.length = 0;
            return;
        }

        if (this.interactiveTileSetsNearBy.length > 0 && this.nameTags.length === 0) {

            let tile = this.interactiveTileSetsNearBy[0];

            this.nameTag = this.add.dom(tile.x, tile.y - 50, 'div', `

               background-color: white;
                border-radius: 3px;
                color: navy;
                padding: 5px;
                width: 120px;
                height: 20px;
                z-index: 0;
                line-height: 20px;
                text-align: center;
                font-size: 25px;
                font-weight: bold;
                opacity: 0.8;

            `, tile.action);

            switch(tile.action) {
                case 'navigate': {
                    this.nameTag.setPosition(180, 90);
                    this.nameTag.setText('Adventure');
                    break;
                }
                case 'sleep': {
                    this.nameTag.setPosition(480, 240);
                    this.nameTag.setText('Sleep');
                    break;
                }
                case 'eat': {
                    this.nameTag.setPosition(1760, 280);
                    this.nameTag.setText('Eat');
                    break;
                }
                case 'stats': {
                    this.nameTag.setPosition(1420, 120);
                    this.nameTag.setText('Stats');
                    break;
                }
            }
        }
        this.nameTag.setAlpha(0.5);
        this.nameTag.setVisible(true);
        this.nameTags.push(this.nameTag);
    }
}
