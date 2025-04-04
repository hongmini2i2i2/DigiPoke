import { Scene } from 'phaser';
import player, { Direction } from '../characters/Player';
import MonsterUI from '../ui/inGameHomeUI';
import NavigateUI from '../ui/navigateUI';
import SleepUI from '../ui/sleepUI';
import StatsUI from '../ui/statsUI';

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
        this.keyboardKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W, 
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'f': Phaser.Input.Keyboard.KeyCodes.F
        });
        ///////set player and physics///////
        this.Player = new player(this);
        this.Player.anims.play('VeemonStatic');
        this.Player.setInteractive();

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.layers.forEach(layer => {
            this.physics.add.collider(this.Player, layer);
        });

        ///////load tileset and interact with tilesets///////
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

        ///////monster UI setting///////
        this.monsterClickCount = 0;

        this.Player.on('pointerdown', () => {
            if (this.monsterClickCount === 0){
                this.monsterUI = new MonsterUI(this, 630, 850);
                this.monsterClickCount += 1;
            } else {
                this.showMonsterUI();
            }
        })

        ///////integrated UI environment(except monster UI)///////
        this.uiMap = {
            navigate: new NavigateUI(this, 700, 400),
            sleep: new SleepUI(this, 925, 500, () => {
                this.Player.sleep(); 
                this.nextClickApprove.sleep = true; 
            }),
            stats: new StatsUI(this,700, 400)
        };

        this.nextClickApprove = {
            navigate: true, //다음번에 클릭했을때 2번 눌러야하는거 방지
            sleep: true,
            stats: true,
            eat: true
        }

        //////navigate Click UI//////
        this.uiMap.navigate.dom.setVisible(false);
        this.input.keyboard.on('keydown-F', () => {
            this.pressInteractiveTile("navigate");
        });
        //////sleep Click UI//////
        this.uiMap.sleep.dom.setVisible(false);
        this.input.keyboard.on('keydown-F', () => {
            this.pressInteractiveTile("sleep");
            this.movePlayerManager();
        });
        //////stats Click UI//////
        this.uiMap.stats.dom.setVisible(false);
        this.input.keyboard.on('keydown-F', () => {
            this.pressInteractiveTile("stats");
        });
        /////eat Click/////
        this.input.keyboard.on('keydown-F', () => {
            //pressInteractiveTile은 ui관련 메소드라 필요 X
            this.pressInteractiveTile("eat");
            this.movePlayerManager();
        });
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
        const anyKeyDown = (
            Phaser.Input.Keyboard.JustDown(this.cursorKeys.up) || 
            Phaser.Input.Keyboard.JustDown(this.cursorKeys.down) || 
            Phaser.Input.Keyboard.JustDown(this.cursorKeys.left) || 
            Phaser.Input.Keyboard.JustDown(this.cursorKeys.right) || 
            Phaser.Input.Keyboard.JustDown(this.keyboardKeys.up) || 
            Phaser.Input.Keyboard.JustDown(this.keyboardKeys.down) || 
            Phaser.Input.Keyboard.JustDown(this.keyboardKeys.left) || 
            Phaser.Input.Keyboard.JustDown(this.keyboardKeys.right)
        );
    
        if (this.Player.isInteracting && anyKeyDown) {
            this.Player.isInteracting = false;
            this.Player.anims.play('VeemonStatic');
            this.Player.setVelocity(0, 0); 
        } else if (this.Player.isInteracting) {
            return; 
        }
    
        let isMoving = false;
    
        if (this.cursorKeys.left.isDown || this.keyboardKeys.left.isDown) {
            this.Player.move(Direction.Left);
            isMoving = true;
        } else if (this.cursorKeys.right.isDown || this.keyboardKeys.right.isDown) {
            this.Player.move(Direction.Right);
            isMoving = true;
        }
    
        if (this.cursorKeys.up.isDown || this.keyboardKeys.up.isDown) {
            this.Player.move(Direction.Up);
            isMoving = true;
        } else if (this.cursorKeys.down.isDown || this.keyboardKeys.down.isDown) {
            this.Player.move(Direction.Down);
            isMoving = true;
        }
    
        if (!isMoving && !this.Player.isInteracting) {
            this.Player.stop();
        }
    }

    interactiveTileManager() {
        this.interactiveTileSetsNearBy.length = 0;

        this.interactiveTileSets.forEach( tile => {
            if ( 
                ( (0 < this.Player.x - tile.x && this.Player.x - tile.x < 70) ||
                  (0 < tile.x - this.Player.x && tile.x - this.Player.x < 70) )  && 
                ( (0 < this.Player.y - tile.y && this.Player.y - tile.y < 70) ||
                  (0 < tile.y - this.Player.y && tile.y - this.Player.y < 70) ) 
            ) {
                this.interactiveTileSetsNearBy.push({
                    x: tile.x,
                    y: tile.y,
                    action: tile.action
                });
            }
        });
    }
    
    pressInteractiveTile(interactName) {
        if (this.interactiveTileSetsNearBy.length > 0) {
            let tile = this.interactiveTileSetsNearBy[0];

            if (tile.action === 'eat') {
                this.Player.eat();
                return;
            }

            if (tile.action === interactName) {

                if (this.nextClickApprove[interactName]) {
                    this.uiMap[interactName] ? this.uiMap[interactName].dom.setVisible(true) : () => {}; 
                    this.nextClickApprove[interactName] = false;
                } else {
                    this.uiMap[interactName] ? this.uiMap[interactName].dom.setVisible(false) : () => {};
                    this.nextClickApprove[interactName] = true;
                }

            } else {
                this.uiMap[interactName] ? this.uiMap[interactName].dom.setVisible(false) : () => {}; //ui 띄운 상태로 다른 interactive tile에 가서 f눌렀을때 기존 ui 없애기 ... f 누르면 모든 interactivetile이 다 이거 실행해서 다른거는 없어질 수 있는거.
                this.nextClickApprove[interactName] = true;
            }
        } else {
            this.uiMap[interactName] ? this.uiMap[interactName].dom.setVisible(false) : () => {}; //interactive tile 밖에서 f 눌렀을때 ui 없애기.
            this.nextClickApprove[interactName] = true;
        }
    }



    addNameTag() {
        // no nearby interactive tile == hide nametag
        if (this.interactiveTileSetsNearBy.length === 0) {
            if (this.nameTag) {
                this.nameTag.destroy();
                this.nameTag = null; 
            }
            this.nameTags.length = 0;
            return;
        }

        if (this.interactiveTileSetsNearBy.length > 0 && this.nameTags.length === 0) {

            let tile = this.interactiveTileSetsNearBy[0];

            this.nameTag = this.add.dom(tile.x, tile.y - 50, 'div', `
                background-color: white;
                border-radius: 3px;
                border: 1px solid black;
                color: black;
                width: 120px;
                height: 20px;
                z-index: 0;
                line-height: 20px;
                letter-spacing: 2px;
                text-align: center;
                font-size: 20px;
                font-family: "Jersey 10", sans-serif;
                font-weight: 400;
                font-style: normal;
                opacity: 0;
                transition: opacity 0.3s ease;
                box-shadow: 2px 2px 2px black;
            `, tile.action);

            switch(tile.action) {
                case 'navigate': {
                    this.nameTag.setPosition(175, 90);
                    this.nameTag.setText('Navigator');  
                    break;
                }
                case 'sleep': {
                    this.nameTag.setPosition(480, 230);
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

                this.nameTagTween = this.tweens.add({
                    targets: this.nameTag,
                    x: '+=7',
                    duration: 1500,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
            });
        }
        this.nameTag.node.style.opacity = "1";
        this.nameTags.push(this.nameTag);
    }

    showMonsterUI() {
        if (this.monsterClickCount % 2 == 1) {
            this.monsterUI.dom.setVisible(false);
        } else {
            this.monsterUI.dom.setVisible(true);
        }
        this.monsterClickCount += 1;
    }
}
