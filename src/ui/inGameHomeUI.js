export default class MonsterUI {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x 
     * @param {number} y )
     */
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      const html = `
      <div class="monsterUI">
        <div class="portraitWithName">
          <div class="portrait"><img src="assets/VeemonPortrait.png"></div>
          <div class="name">VEEMON</div>
        </div>
        <div class="statusBar">
          <div class="hungry">
            <div class="text">Hungry</div>
            <div class="entireBar">
              <div class="interactiveBarHungry"></div>
            </div>
          </div>
          <div class="stamina">
            <div class="text">Stamina</div>
            <div class="entireBar">
              <div class="interactiveBarStamina"></div>
            </div>
          </div>
          <div class="exp">
            <div class="text">EXP</div>
            <div class="entireBar">
              <div class="interactiveBarExp"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.dom = scene.add.dom(this.x, this.y).createFromHTML(html);

    const style = `
    <style>
        .monsterUI {
            opacity: 1;
            transition: opacity 0.3s ease;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 22px;
            font-family: "Jersey 10", sans-serif;
            font-size: 24px;
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 4px;
            transition: opacity 0.3s ease;
        }
        .portraitWithName {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .portrait {
            width: 92px;
            height: 92px;
            border-radius: 4px;
            background: #666;
        }

        .portrait img {
            width: 92px;
            height: 92px;
            border-radius: 4px;
        }

        .name {
            font-size: 24px;
            letter-spacing: 4px;
            margin-left: 4px;
        }
        .statusBar {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 20px;
        }
        .entireBar {
            width: 552px;
            height: 20px;
            background-color: #D9D9D9;
            border-radius: 4px;
        }
        .interactiveBarHungry {
            height: 20px;
            background-color: #FF0000;
            opacity: 0.5;
            border-radius: 4px;
        }
        .interactiveBarStamina {
            height: 20px;
            background-color: #FFEE00;
            opacity: 0.5;
            border-radius: 4px;
        }
        .interactiveBarExp {
            height: 20px;
            background-color: #00B7FF;
            opacity: 0.5;
            border-radius: 4px;
        }
    </style>
    `;
    this.scene.add.dom(0, 0).createFromHTML(style);

    }
  }
  