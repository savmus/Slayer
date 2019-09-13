function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;

    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = true;

    this.mute = this.mute.bind(this);

    document.body.appendChild(this.sound);
}

Sound.prototype.play = function play() {
    var playPromise = this.sound.play();

    if (playPromise !== undefined) {
            playPromise
                .then(_ => { })
                .catch(error => { })
    }
}

Sound.prototype.stop = function stop() {
    this.sound.pause();
}

Sound.prototype.mute = function mute(e) {
    e.preventDefault();

    let button = document.getElementById("mute");

    if (button.innerHTML === "Mute") {
        this.stop();
        button.innerHTML = "Unmute";
    } else {
        this.play();
        button.innerHTML = "Mute";
    }
}

module.exports = Sound;