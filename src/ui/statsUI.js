export default class StatsUI {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        const html = `
        <div class="statsContainer">
            <div class="title">Stats</div>
            <div class="wrapTexts">
                <div class="text" >Age : 3</div>
                <div class="text" >Born : 2025-03-30</div>
                <div class="text" >Win : 30</div>
                <div class="text" >Lose : 7</div>
                <div class="text" >Max Stage : 42</div>
            </div>
        </div>
        `;

        this.dom = scene.add.dom(this.x, this.y).createFromHTML(html);

        const style = `
        <style>
            .statsContainer{
                opacity: 1;
                display: flex;
                box-sizing: border-box;
                align-items: center;
                flex-direction: column;
                background-color: rgba(5, 14, 39, 0.9);
                border-radius: 16px;
                width: 580px;
                height: 426px;
                transition: opacity 0.3s ease;
            }

            .statsContainer .title {
                align-items: center;
                justify-content: center;
                font-family: "Jersey 10", sans-serif;
                color: white;
                font-size: 64px;
                margin-top: 26px;
            }

            .wrapTexts{
                width: 80%;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                align-items: flex-start;
                justify-content: space-between;
                gap: 24px;
            }

            .text {
                display: flex;
                box-sizing: border-box;
                font-family: "Jersey 10", sans-serif;
                font-size: 30px;
                color: white;
                transition: transform 0.2s ease, opacity 0.2s ease;
            }

        </style>
        `;
        this.scene.add.dom(0, 0).createFromHTML(style);
    }
}