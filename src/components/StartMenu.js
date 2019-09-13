const Game = require("./Game");
const GameView = require("./GameView");

function StartMenu() {
    this.startHandler = this.startHandler.bind(this);
}

StartMenu.prototype.title = function title() {
    window.addEventListener("keyup", this.startHandler);
}

StartMenu.prototype.startHandler = function startHandler(ev) {
    if (ev.keyCode === 13) {
        let canvas = document.getElementById("screenChange");
        canvas.innerHTML = "<canvas id='viewport' width='600px' height='500px'></canvas><canvas id='player' width='600px' height='500px'></canvas><canvas id='fight' class='hide' width='600px' height='500px'></canvas><script type='application/javascript' src='./main.js'></script>";
        
        let aside = document.getElementById("aside");
        aside.classList.remove("hide");
        
        const viewport = document.getElementById("viewport");
        const player = document.getElementById("player");
        
        const viewCtx = viewport.getContext("2d");
        const playCtx = player.getContext("2d");
        
        const game = new Game();
        new GameView(game, player, viewport, viewCtx, playCtx).init(['tile', 'player'], ['../assets/backgrounds/grass_tile.png', '../assets/characters/main_forward.png']);

        this.start();
    }
}

StartMenu.prototype.start = function start() {
    window.removeEventListener("keyup", this.startHandler);
}

module.exports = StartMenu;