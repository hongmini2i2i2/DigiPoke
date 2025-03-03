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

            this.Player = new player(this);
            this.Player.anims.play('VeemonStatic');

            this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
            this.layers.forEach(layer => {
                this.physics.add.collider(this.Player, layer);
            });

        }

        update() 
        {
            this.movePlayerManager();
            this.Player.setCollideWorldBounds(true);
        }
        ///////Methods///////
        movePlayerManager() {
            let isMoving = false; // 이동 여부를 저장하는 변수
        
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
        
    }
