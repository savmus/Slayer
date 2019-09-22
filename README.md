# Slayer

Play: [Slayer](https://savmus.github.io/Slayer/dist/)

Slayer is a single-player 2d RPG game, built with HTML, Canvas, CSS, and JavaScript. The files are bundled with Webpack, and the game is hosted live on GitHub Pages.

#### Instructions

Defeat all the monsters without letting your HP hit zero! Use the arrow keys to move around the map, and walk over chests to open them. Press enter to attack!

## Implementation

Canvases:
Fight - Hidden until fight is activated. Z-index 100.
Health - There the whole time. Z-index 99. Hidden by fight.
Player - There the whole time. Fixed. Player is redrawn in different directions to give illusion of movement. Z-index 98. Hidden by fight.
Viewport - There the whole time. Z-index 97. Hidden by everything else.
World - Contains monsters and chests.

## Future features

* NPCs
* Currency and shopping
* Game saving