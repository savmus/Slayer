const Game = require("./Game");
const GameView = require("./GameView");
const Sound = require("./Sound");

function StartMenu() {
    this.startHandler = this.startHandler.bind(this);
    this.playHandler = this.playHandler.bind(this);
}

StartMenu.prototype.title = function title() {
    window.addEventListener("keyup", this.startHandler);

    this.music = new Sound("../assets/music/our_mountain.mp3");
    this.music.play();
}

StartMenu.prototype.startHandler = function startHandler(ev) {
    if (ev.keyCode === 13) {
        let canvas = document.getElementById("screenChange");
        canvas.innerHTML = "<canvas id='viewport' width='600px' height='500px'></canvas><canvas id='player' width='600px' height='500px'></canvas><canvas id='fight' class='hide' width='600px' height='500px'></canvas><canvas id='health' width='600px' height='500px'></canvas><script type='application/javascript' src='./main.js'></script>";
        
        let aside = document.getElementById("aside");
        aside.classList.remove("hide");
        
        const viewport = document.getElementById("viewport");
        const player = document.getElementById("player");
        
        const viewCtx = viewport.getContext("2d");
        const playCtx = player.getContext("2d");

        this.music.stop();
        
        const game = new Game();
        new GameView(game, player, viewport, viewCtx, playCtx).init(['tile', 'player'], ['../assets/backgrounds/grass_tile.png', '../assets/characters/main_forward.png']);

        this.start();
    }
}

StartMenu.prototype.start = function start() {
    window.removeEventListener("keyup", this.startHandler);
}

StartMenu.prototype.playBtn = function playBtn() {
    let btn = document.getElementById("play");

    btn.addEventListener("click", this.playHandler);
}

StartMenu.prototype.playHandler = function playHandler(e) {
    e.preventDefault();

    let btn = document.getElementById("play");
    btn.classList.add("hide");

    let start = document.getElementById("startScreen");
    start.classList.remove("hide");

    this.play();
}

StartMenu.prototype.play = function play() {
    window.removeEventListener("click", this.playHandler);

    this.title();
}

module.exports = StartMenu;