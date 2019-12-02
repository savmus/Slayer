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

    let mute = document.getElementById("mute");
    mute.addEventListener('click', this.music.mute);
}

StartMenu.prototype.startHandler = function startHandler(ev) {
    if (ev.keyCode === 13) {
        let canvas = document.getElementById("screenChange");
        canvas.innerHTML = "<canvas id='viewport' width='600px' height='500px'></canvas><canvas id='player' width='600px' height='500px'></canvas><canvas id='fight' class='hide' width='600px' height='500px'></canvas><canvas id='health' width='600px' height='500px'></canvas><script type='application/javascript' src='./main.js'></script>";

        let restart = document.getElementById("restart");
        restart.classList.remove("hide");
        restart.addEventListener('click', this.restart);
        
        let aside = document.getElementById("aside");
        aside.classList.remove("hide");
        aside.classList.add("reveal-aside");
        
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

    let mute = document.getElementById("mute");
    mute.removeEventListener('click', this.music.mute);
}

StartMenu.prototype.playBtn = function playBtn() {
    let btn = document.getElementById("play");
    let modal = document.getElementById("modal");
    let help = document.getElementById("help");
    let span = document.getElementsByClassName("close")[0];

    help.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    btn.addEventListener("click", this.playHandler);
}

StartMenu.prototype.playHandler = function playHandler(e) {
    e.preventDefault();

    let btn = document.getElementById("play");
    btn.classList.add("hide");

    let mute = document.getElementById("mute");
    mute.classList.remove("hide");

    let start = document.getElementById("startScreen");
    start.classList.remove("hide");

    this.play();
}

StartMenu.prototype.play = function play() {
    window.removeEventListener("click", this.playHandler);

    this.title();
}

StartMenu.prototype.restart = function restart() {
    location.reload();
}

module.exports = StartMenu;