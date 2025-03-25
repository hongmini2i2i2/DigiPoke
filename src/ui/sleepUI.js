export default class SleepUI {
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
       <div class="sleepContainer">
        <div class="title">Sleep</div>
        <div class="wrapButton">
            <div class="button">YES</div>
            <div class="button">NO</div>
        </div>
        </div>
       </div>
    `;

    this.dom = scene.add.dom(this.x, this.y).createFromHTML(html);

    const style = `
    <style>
        .sleepContainer{
            opacity: 1;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            flex-direction: column;
            background-color: rgba(5, 14, 39, 0.9);
            border-radius: 16px;
            width: 580px;
            height: 268px;
            transition: opacity 0.3s ease;
        }

        .sleepContainer .title {
            align-items: center;
            justify-content: center;
            font-family: "Jersey 10", sans-serif;
            color: white;
            font-size: 64px;
            margin-top: 26px;
        }

        .wrapButton{
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            align-items: center;
            justify-content: space-between;
            gap: 22px;
        }

        .button {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            width: 522px;
            height: 54px;
            font-family: "Jersey 10", sans-serif;
            font-size: 30px;
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            transition: transform 0.2s ease, opacity 0.2s ease;
            cursor: pointer;
        }

        .button:hover {
            transform: scale(0.95);
            opacity: 0.7;
        }
    </style>
    `;
    this.scene.add.dom(0, 0).createFromHTML(style);

    }
  }
  