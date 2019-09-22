/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Chest.js":
/*!*********************************!*\
  !*** ./src/components/Chest.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Chest(width, height, color, x, y, worldCtx, item) {\n    this.width = width;\n    this.height = height;\n    this.x = x;\n    this.y = y;\n    this.item = item;\n    this.opened = false;\n\n    this.image = new Image();\n    this.image.src = color;\n\n    this.ctx = worldCtx;\n    worldCtx.fillStyle = color;\n    worldCtx.fillRect(this.x, this.y, this.width, this.height);\n}\n\nChest.prototype.update = function update() {\n    this.ctx.drawImage(\n        this.image,\n        this.x,\n        this.y,\n        this.width,\n        this.height\n    );\n}\n\nmodule.exports = Chest;\n\n//# sourceURL=webpack:///./src/components/Chest.js?");

/***/ }),

/***/ "./src/components/Fight.js":
/*!*********************************!*\
  !*** ./src/components/Fight.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Fighter = __webpack_require__(/*! ./Fighter */ \"./src/components/Fighter.js\");\nconst Health = __webpack_require__(/*! ./Health */ \"./src/components/Health.js\");\nconst Text = __webpack_require__(/*! ./Text */ \"./src/components/Text.js\");\nconst Game = __webpack_require__(/*! ./Game */ \"./src/components/Game.js\");\n\nfunction Fight(canvas, monster, player, loop) {\n    this.canvas = canvas;\n    this.ctx = canvas.getContext(\"2d\");\n\n    this.monster = monster;\n    this.player = player;\n    this.loop = loop;\n\n    this.updateFight = this.updateFight.bind(this);\n    this.startHandler = this.startHandler.bind(this);\n    this.monsterAttack = this.monsterAttack.bind(this);\n\n    this.interval = setInterval(this.updateFight, 20);\n    this.attack = setInterval(this.monsterAttack, this.monster.attackSpeed);\n}\n\nFight.prototype.startHandler = function startHandler(ev) {\n    if (ev.keyCode === 13) {\n        this.monster.health -= (Game.items[this.player.weapon].damage) + (this.player.level.attack);\n\n        if (this.monster.health <= 0) {\n            this.end('player');\n        }\n    }\n}\n\nFight.prototype.monsterAttack = function monsterAttack() {\n    this.player.health -= (this.monster.weapon.damage) + (this.monster.level.attack);\n\n    if (this.player.health <= 0) {\n        this.end('monster');\n        clearInterval(this.attack);\n    }\n}\n\nFight.prototype.end = function end(winner) {\n    window.removeEventListener(\"keyup\", this.startHandler);\n    clearInterval(this.attack);\n\n    if (winner === 'player') {\n        this.monster.beat = true;\n        this.monster.image.src = \"../assets/backgrounds/grass_tile.png\";\n        this.player.defeated += 1;\n\n        if (this.player.defeated === 10) {\n            this.player.level = Game.levels[this.player.level.level + 1];\n            this.player.defeated = 0;\n        }\n\n        clearInterval(this.interval);\n        this.canvas.classList.add(\"hide\");\n        requestAnimationFrame(this.loop);\n    } else {\n        let canvas = document.getElementById(\"screenChange\");\n        canvas.innerHTML = \"<div class='loser'><div class='loser-text'><h1>You have been defeated.<br>You lose.</h1><div class='credits'><h2>Credits</h2><p>Artwork by:</p><ul><li><a href='https://pipoya.itch.io/'>pipoya</a></li><li><a href='https://opengameart.org/users/athile'>athile</a></li><li><a href='https://opengameart.org/users/gaurav'>Gaurav</a></li><li><a href='https://opengameart.org/users/reemax'>Reemax</a></li></ul><p>Music by: <a href='www.soundimage.org'>Eric Matyas</a></p></div></div></div><script type='application/javascript' src='./main.js'></script>\";\n\n        let aside = document.getElementById(\"aside\");\n        aside.classList.add(\"hide\");\n    }\n}\n\nFight.prototype.start = function start() {\n    this.background = new Fighter(600, 500, \"../assets/backgrounds/grass.png\", 0, 0, this.ctx);\n    this.mFighter = new Fighter(100, 150, \"../assets/monsters/undead_forward.png\", 250, 50, this.ctx);\n    this.pFighter = new Fighter(76, 100, \"../assets/characters/main_up.png\", 262, 350, this.ctx);\n    this.mHealth = new Health(140, 15, 425, 20, this.ctx, this.monster);\n    this.pHealth = new Health(140, 15, 35, 350, this.ctx, this.player);\n    this.mHealthText = new Text(\"18px\", \"Sans-Serif\", \"black\", 425, 50, this.ctx, \"Undead HP: \");\n    this.pHealthText = new Text(\"18px\", \"Sans-Serif\", \"black\", 35, 380, this.ctx, \"Your HP: \");\n    this.weaponType = new Text(\"20px\", \"Sans-Serif\", \"black\", 35, 430, this.ctx, \"Active weapon: \");\n    this.weaponAttack = new Text(\"20px\", \"Sans-Serif\", \"black\", 35, 455, this.ctx, \"Attack: \");\n    this.monsterAttack = new Text(\"20px\", \"Sans-Serif\", \"black\", 425, 105, this.ctx, \"Undead attack: \");\n    this.monsterName = new Text(\"38px\", \"Sans-Serif\", \"black\", 35, 45, this.ctx, \"Undead\");\n    this.pLevel = new Text(\"18px\", \"Sans-Serif\", \"black\", 425, 430, this.ctx, \"Level \");\n    this.mLevel = new Text(\"18px\", \"Sans-Serif\", \"black\", 35, 100, this.ctx, \"Level \");\n\n    window.addEventListener(\"keyup\", this.startHandler);\n}\n\nFight.prototype.clear = function clear() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n}\n\nFight.prototype.updateFight = function updateFight() {\n    this.clear();\n\n    this.pHealthText.text = \"Your HP: \" + this.player.health;\n    this.mHealthText.text = \"Undead HP: \" + this.monster.health;\n    this.weaponType.text = \"Active weapon: \" + this.player.weapon;\n    this.weaponAttack.text = \"Attack: \" + (Game.items[this.player.weapon].damage + this.player.level.attack);\n    this.monsterAttack.text = \"Undead attack: \" + (this.monster.weapon.damage + this.monster.level.attack);\n    this.pLevel.text = \"Level \" + this.player.level.level;\n    this.mLevel.text = \"Level \" + this.monster.level.level;\n\n    this.background.update();\n    this.mFighter.update();\n    this.pFighter.update();\n    this.pHealth.update();\n    this.mHealth.update();\n    this.pHealthText.update();\n    this.mHealthText.update();\n    this.weaponType.update();\n    this.weaponAttack.update();\n    this.monsterAttack.update();\n    this.monsterName.update();\n    this.pLevel.update();\n    this.mLevel.update();\n}\n\nmodule.exports = Fight;\n\n//# sourceURL=webpack:///./src/components/Fight.js?");

/***/ }),

/***/ "./src/components/Fighter.js":
/*!***********************************!*\
  !*** ./src/components/Fighter.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Fighter(width, height, src, x, y, ctx) {\n    this.width = width;\n    this.height = height;\n    this.x = x;\n    this.y = y;\n    this.ctx = ctx;\n\n    this.image = new Image();\n    this.image.src = src;\n}\n\nFighter.prototype.update = function update() {\n    this.ctx.drawImage(\n        this.image,\n        this.x,\n        this.y,\n        this.width, \n        this.height\n    );\n}\n\nmodule.exports = Fighter;\n\n//# sourceURL=webpack:///./src/components/Fighter.js?");

/***/ }),

/***/ "./src/components/Game.js":
/*!********************************!*\
  !*** ./src/components/Game.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Game() {\n    \n}\n\nGame.prototype.isWon = function isWon(monsters) {\n    let beat = monsters.filter((el, idx, arr) => { el.beat });\n\n    if (beat.length === 100) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\nGame.items = {\n    \"Healing potion\": {\n        name: \"Healing potion\",\n        health: 99\n    },\n    \"Wine\": {\n        name: \"Wine\",\n        health: 94\n    },\n    \"Mead\": {\n        name: \"Mead\",\n        health: 89\n    },\n    \"Rum\": {\n        name: \"Rum\",\n        health: 84\n    },\n    \"Ale\": {\n        name: \"Ale\",\n        health: 79\n    },\n    \"Bandage\": {\n        name: \"Bandage\",\n        health: 74\n    },\n    \"Tourniquet\": {\n        name: \"Tourniquet\",\n        health: 69\n    },\n    \"Fresh water\": {\n        name: \"Fresh water\",\n        health: 64\n    },\n    \"Warm milk\": {\n        name: \"Warm milk\",\n        health: 59\n    },\n    \"Bread\": {\n        name: \"Bread\",\n        health: 54\n    },\n    \"Cheese\": {\n        name: \"Cheese\",\n        health: 49\n    },\n    \"Apple\": {\n        name: \"Apple\",\n        health: 44\n    },\n    \"Berries\": {\n        name: \"Berries\",\n        health: 39\n    },\n    \"Moldy bread\": {\n        name: \"Moldy bread\",\n        health: 34\n    },\n    \"Moldy cheese\": {\n        name: \"Moldy cheese\",\n        health: 29\n    },\n    \"Grass\": {\n        name: \"Grass\",\n        health: 24\n    },\n    \"Dirty water\": {\n        name: \"Dirty water\",\n        health: 19\n    },\n    \"Bread crumbs\": {\n        name: \"Bread crumbs\",\n        health: 14\n    },\n    \"Dead grass\": {\n        name: \"Dead grass\",\n        health: 9\n    },\n    \"Crumb\": {\n        name: \"Crumb\",\n        health: 4\n    },\n    \"Spear\": {\n        name: \"Spear\",\n        damage: 10\n    },\n    \"Sword\": {\n        name: \"Sword\",\n        damage: 8\n    },\n    \"Bow\": {\n        name: \"Bow\",\n        damage: 7\n    },\n    \"Lightening spell\": {\n        name: \"Lightening spell\",\n        damage: 6\n    },\n    \"Fire spell\": {\n        name: \"Fire spell\",\n        damage: 5\n    },\n    \"Dagger\": {\n        name: \"Dagger\",\n        damage: 4\n    },\n    \"Large stick\": {\n        name: \"Large stick\",\n        damage: 3\n    },\n    \"Small stick\": {\n        name: \"Small stick\",\n        damage: 2\n    },\n    \"Fists\": {\n        name: \"Fists\",\n        damage: 1\n    }\n}\n\nGame.levels = {\n    1: {\n        level: 1,\n        attack: 2\n    },\n    2: {\n        level: 2,\n        attack: 4\n    },\n    3: {\n        level: 3,\n        attack: 6\n    },\n    4: {\n        level: 4,\n        attack: 8\n    },\n    5: {\n        level: 5,\n        attack: 10\n    },\n    6: {\n        level: 6,\n        attack: 12\n    },\n    7: {\n        level: 7,\n        attack: 14\n    },\n    8: {\n        level: 8,\n        attack: 16\n    },\n    9: {\n        level: 9,\n        attack: 18\n    },\n    10: {\n        level: 10,\n        attack: 20\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/components/Game.js?");

/***/ }),

/***/ "./src/components/GameView.js":
/*!************************************!*\
  !*** ./src/components/GameView.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Sprite = __webpack_require__(/*! ./Sprite */ \"./src/components/Sprite.js\");\nconst Sound = __webpack_require__(/*! ./Sound */ \"./src/components/Sound.js\");\nconst Game = __webpack_require__(/*! ./Game */ \"./src/components/Game.js\");\nconst Chest = __webpack_require__(/*! ./Chest */ \"./src/components/Chest.js\");\nconst Monster = __webpack_require__(/*! ./Monster */ \"./src/components/Monster.js\");\nconst Fight = __webpack_require__(/*! ./Fight */ \"./src/components/Fight.js\");\nconst HP = __webpack_require__(/*! ./HP */ \"./src/components/HP.js\");\n\nfunction GameView(game, player, viewport, viewCtx, playCtx) {\n    this.game = game;\n    this.viewport = viewport;\n    this.player = player;\n    this.viewCtx = viewCtx;\n    this.playCtx = playCtx;\n\n    this.grid = { 'width': 60, 'height': 60 };\n    this.tile = { 'width': 64, 'height': 64 };\n    this.view = { 'width': 640, 'height': 640 };\n\n    this.world = this.createElement('canvas', {\n        'width': 3840,\n        'height': 3840\n    });\n\n    this.worldCtx = this.world.getContext(\"2d\");\n\n    this.cursor = {\n        'rightPressed': false,\n        'leftPressed': false,\n        'downPressed': false,\n        'upPressed': false\n    };\n\n    this.img = {};\n    this.sprites = {};\n    this.chests = [];\n    this.monsters = [];\n\n    this.loop = this.loop.bind(this);\n    this.clickHandler = this.clickHandler.bind(this);\n}\n\nGameView.prototype.createElement = function createElement(ele, attrObj) {\n    var element = document.createElement(ele);\n\n    if (attrObj) {\n        for (var i in attrObj) {\n            element.setAttribute(i, attrObj[i]);\n        }\n    }\n\n    return element;\n}\n\nGameView.prototype.keyDownHandler = function keyDownHandler(event) {\n    event.preventDefault();\n\n    if (event.keyCode == 39) {\n        this.cursor.rightPressed = true;\n    } else if (event.keyCode == 37) {\n        this.cursor.leftPressed = true;\n    }\n\n    if (event.keyCode == 40) {\n        this.cursor.downPressed = true;\n    } else if (event.keyCode == 38) {\n        this.cursor.upPressed = true;\n    }\n}\n\nGameView.prototype.keyUpHandler = function keyUpHandler(event) {\n    event.preventDefault();\n\n    if (event.keyCode == 39) {\n        this.cursor.rightPressed = false;\n    } else if (event.keyCode == 37) {\n        this.cursor.leftPressed = false;\n    }\n\n    if (event.keyCode == 40) {\n        this.cursor.downPressed = false;\n    } else if (event.keyCode == 38) {\n        this.cursor.upPressed = false;\n    }\n}\n\nGameView.prototype.addSprite = function addSprite(key) {\n    this.sprites[key] = new Sprite(key, this.world, this.player, this.img, this.playCtx, this.clickHandler);\n}\n\nGameView.prototype.imageSrc = function imageSrc() {\n    let values = Object.values(this.cursor);\n    let count = 0;\n\n    for (let i = 0; i < values.length; i++) {\n        if (values[i]) {\n            count++;\n        }\n    };\n\n    if (count > 1) {\n        if (this.cursor.downPressed) {\n            this.sprites['player'].img.src = \"../assets/characters/main_forward.png\";\n        } else if (this.cursor.upPressed) {\n            this.sprites['player'].img.src = \"../assets/characters/main_up.png\";\n        }\n\n        return true;\n    } else {\n        return false;\n    }\n}\n\nGameView.prototype.spriteUpdate = function update() {\n    if (this.cursor.rightPressed && this.sprites['player'].pos.x < this.world.width - this.sprites['player'].width) {\n        if (!this.imageSrc()) {\n            this.sprites['player'].img.src = \"../assets/characters/main_right.png\";\n        };\n\n        this.sprites['player'].pos.x += this.sprites['player'].speed.x;\n    } else if (this.cursor.leftPressed && this.sprites['player'].pos.x >= 0) {\n        if (!this.imageSrc()) {\n            this.sprites['player'].img.src = \"../assets/characters/main_left.png\";\n        };\n\n        this.sprites['player'].pos.x -= this.sprites['player'].speed.x;\n    }\n\n    if (this.cursor.downPressed && this.sprites['player'].pos.y < this.world.height - this.sprites['player'].height) {\n        if (!this.imageSrc()) {\n            this.sprites['player'].img.src = \"../assets/characters/main_forward.png\";\n        };\n        \n        this.sprites['player'].pos.y += this.sprites['player'].speed.y;\n    } else if (this.cursor.upPressed && this.sprites['player'].pos.y >= 0) {\n        if (!this.imageSrc()) {\n            this.sprites['player'].img.src = \"../assets/characters/main_up.png\";\n        };\n        \n        this.sprites['player'].pos.y -= this.sprites['player'].speed.y;\n    }\n};\n\nGameView.prototype.openChest = function openChest(chest) {\n    this.sprites['player'].addItem(chest.item);\n\n    chest.opened = true;\n    chest.image.src = \"../assets/items/open_chest.png\";\n\n    requestAnimationFrame(this.loop);\n}\n\nGameView.prototype.fightMonster = function fightMonster(monster) {\n    monster.engaged = true;\n\n    let canvas = document.getElementById(\"fight\");\n    canvas.classList.remove(\"hide\");\n\n    let fight = new Fight(canvas, monster, this.sprites['player'], this.loop);\n    \n    fight.start();\n}\n\nGameView.prototype.clickHandler = function clickHandler(e) {\n    e.preventDefault();\n\n    let heal = Game.items[e.target.id].health;\n\n    this.sprites['player'].health += heal;\n\n    if (this.sprites['player'].health > 100) {\n        this.sprites['player'].health = 100;\n    }\n\n    this.sprites['player'].heal(e.target);\n\n    if (e.target.parentNode) {\n        e.target.parentNode.removeChild(e.target);\n    }\n}\n\nGameView.prototype.findsx = function findsx() {\n    if (this.sprites.player.pos.x < 300) {\n        return 0;\n    } else if (this.sprites.player.pos.x > this.world.width - 300) {\n        return this.world.width - 600;\n    } else {\n        return this.sprites.player.pos.x + (this.sprites.player.width / 2) - 315;\n    }\n}\n\nGameView.prototype.findsy = function findsy() {\n    if (this.sprites.player.pos.y < 250) {\n        return 0;\n    } else if (this.sprites.player.pos.y > this.world.height - 250) {\n        return this.world.height - 500;\n    } else {\n        return this.sprites.player.pos.y + (this.sprites.player.height / 2) - 265;\n    }\n}\n\nGameView.prototype.loop = function loop() {\n    const that = this;\n\n    if (this.game.isWon(this.monsters)) {\n        let canvas = document.getElementById(\"screenChange\");\n        canvas.innerHTML = \"<div class='winner'><div class='winner-text'><h1>You defeated all the monsters!<br>You win!</h1><div class='credits'><h2>Credits</h2><p>Artwork by:</p><ul><li><a href='https://pipoya.itch.io/'>pipoya</a></li><li><a href='https://opengameart.org/users/athile'>athile</a></li><li><a href='https://opengameart.org/users/gaurav'>Gaurav</a></li><li><a href='https://opengameart.org/users/reemax'>Reemax</a></li></ul><p>Music by: <a href='www.soundimage.org'>Eric Matyas</a></p></div></div></div><script type='application/javascript' src='./main.js'></script>\";\n\n        let aside = document.getElementById(\"aside\");\n        aside.classList.add(\"hide\");\n    } else {\n        const monster = this.sprites['player'].isMonster(this.monsters);\n        const chest = this.sprites['player'].isChest(this.chests);\n\n        if (monster) {\n            this.fightMonster(monster);\n        } else if (chest) {\n            this.openChest(chest);\n        } else {\n            this.spriteUpdate();\n            this.hBar.update();\n\n            this.chests.forEach(chest => {\n                chest.update();\n            });\n\n            this.monsters.forEach(monster => {\n                monster.update();\n            })\n\n            this.sprites['player'].draw();\n\n            this.viewCtx.clearRect(0, 0, this.viewport.width, this.viewport.height);\n\n            this.viewCtx.drawImage(\n                this.world, \n                this.findsx(), \n                this.findsy(), \n                600, \n                500, \n                0, \n                0, \n                600, \n                500\n            );\n\n            let optionsArr = Array.from(document.getElementsByClassName(\"option\"));\n            optionsArr.forEach((option, idx) => {\n                option.addEventListener('click', this.clickHandler);\n            });\n\n            let weaponsArr = Array.from(document.getElementsByClassName(\"weapon\"));\n            weaponsArr.forEach((weapon, idx) => {\n                weapon.addEventListener('click', (e) => {\n                    e.preventDefault();\n\n                    that.sprites['player'].weapon = e.target.id;\n                })\n            });\n\n            requestAnimationFrame(this.loop);\n        }\n    }\n}\n\nGameView.prototype.generateChests = function generateChests() {\n    const items = Object.values(Game.items);\n\n    for (let i = 0; i < 50; i++) {\n        let x = Math.floor(Math.random() * (3807 - 1 + 1)) + 1;\n        let y = Math.floor(Math.random() * (3807 - 1 + 1)) + 1;\n\n        let j = Math.floor(Math.random() * (28 - 0 + 0)) + 0;\n\n        let chest = new Chest(20, 20, \"../assets/items/chest.png\", x, y, this.worldCtx, items[j]);\n        this.chests.push(chest);\n    }\n}\n\nGameView.prototype.generateMonsters = function generateMonsters() {\n    const weapons = Object.values(Game.items).slice(20, 29);\n    const levels = Object.values(Game.levels);\n\n    for (let i = 0; i < 100; i++) {\n        let x = Math.floor(Math.random() * (3807 - 1 + 1)) + 1;\n        let y = Math.floor(Math.random() * (3807 - 1 + 1)) + 1;\n\n        let j = Math.floor(Math.random() * (8 - 0 + 0)) + 0;\n        let speed = Math.floor(Math.random() * (1500 - 500 + 500)) + 500;\n        let k = Math.floor(Math.random() * (9 - 0 + 0)) + 0;\n\n        let monster = new Monster(35, 40, \"../assets/monsters/undead_forward.png\", x, y, this.worldCtx, this.world, weapons[j], speed, levels[k]);\n        this.monsters.push(monster);\n    }\n}\n\nGameView.prototype.createWorld = function createWorld(_numTileWidth, _numTileHeight, _tWidth, _tHeight) {\n    for (var i = 0, len = _numTileHeight; i < len; i++) {\n        for (var k = 0, len2 = _numTileWidth; k < len2; k++) {\n            var x = k * _tWidth,\n                y = i * _tHeight,\n                image = this.img['tile'];\n            this.worldCtx.drawImage(image, x, y, _tWidth, _tHeight);\n        }\n    }\n\n    this.addSprite('player');\n    this.generateChests();\n    this.generateMonsters();\n\n    let hCanvas = document.getElementById(\"health\");\n    this.hBar = new HP(hCanvas, this.sprites['player']);\n    \n    this.music = new Sound(\"../assets/music/fantascape.mp3\");\n    this.music.play();\n\n    let mute = document.getElementById(\"mute\");\n    mute.addEventListener('click', this.music.mute);\n\n    requestAnimationFrame(this.loop);\n}\n\nGameView.prototype.init = function init(key, assets) {\n    document.onkeydown = this.keyDownHandler.bind(this);\n    document.onkeyup = this.keyUpHandler.bind(this);\n\n    const that = this;\n\n    for (var i = 0, len = assets.length; i < len; i++) {\n        var image = new Image();\n\n        if (i !== len - 1) {\n            var str = key[i];\n            image.onload = function () {\n                that.img[str] = this;\n                that.createWorld(that.grid.width, that.grid.height, that.tile.width, that.tile.height);\n            };\n        } else {\n            var str2 = key[i];\n            image.onload = function () {\n                that.img[str2] = this;\n            };\n        }\n\n        image.src = assets[i];\n    }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/components/GameView.js?");

/***/ }),

/***/ "./src/components/HP.js":
/*!******************************!*\
  !*** ./src/components/HP.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Health = __webpack_require__(/*! ./Health */ \"./src/components/Health.js\");\nconst Text = __webpack_require__(/*! ./Text */ \"./src/components/Text.js\");\n\nfunction HP(canvas, player) {\n    this.canvas = canvas;\n    this.ctx = canvas.getContext(\"2d\");\n\n    this.player = player;\n    this.health = new Health(140, 15, 440, 20, this.ctx, this.player);\n    this.hp = new Text(\"14px\", \"Sans-Serif\", \"black\", 440, 15, this.ctx, \"100/100 HP\");\n    this.weapon = new Text(\"14px\", \"Sans-Serif\", \"black\", 440, 50, this.ctx, \"Weapon: \");\n\n    this.update = this.update.bind(this);\n\n    this.interval = setInterval(this.update, 20);\n}\n\nHP.prototype.clear = function clear() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n}\n\nHP.prototype.update = function update() {\n    this.clear();\n\n    this.hp.text = this.player.health + \"/100 HP\";\n    this.weapon.text = \"Weapon: \" + this.player.weapon;\n\n    this.health.update();\n    this.hp.update();\n    this.weapon.update();\n}\n\nmodule.exports = HP;\n\n//# sourceURL=webpack:///./src/components/HP.js?");

/***/ }),

/***/ "./src/components/Health.js":
/*!**********************************!*\
  !*** ./src/components/Health.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Health(width, height, x, y, ctx, fighter) {\n    this.width = width;\n    this.height = height;\n    this.x = x;\n    this.y = y;\n    this.ctx = ctx;\n    this.fighter = fighter;\n    this.max = 100;\n}\n\nHealth.prototype.update = function update() {\n    var percent = this.fighter.health / this.max;\n\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillRect(this.x, this.y, this.width, this.height);\n\n    this.ctx.fillStyle = \"red\";\n    this.ctx.fillRect(this.x, this.y, this.width * percent, this.height);\n}\n\nmodule.exports = Health;\n\n//# sourceURL=webpack:///./src/components/Health.js?");

/***/ }),

/***/ "./src/components/Monster.js":
/*!***********************************!*\
  !*** ./src/components/Monster.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Monster(width, height, color, x, y, worldCtx, world, weapon, speed, level) {\n    this.width = width;\n    this.height = height;\n    this.x = x;\n    this.y = y;\n    this.ctx = worldCtx;\n    this.world = world;\n\n    this.pos = {\n        'x': this.x,\n        'y': this.y\n    };\n\n    this.speed = {\n        'x': 2,\n        'y': 2\n    };\n\n    this.engaged = false;\n    this.beat = false;\n    this.weapon = weapon;\n    this.attackSpeed = speed;\n    this.level = level;\n    this.health = 100;\n\n    this.image = new Image();\n    this.image.src = color;\n\n    this.image.onload = this.update();\n}\n\nMonster.prototype.update = function update() {\n    const that = this;\n\n    this.image.onload = function draw() {\n        that.ctx.drawImage(\n            that.image,\n            that.x,\n            that.y,\n            that.width,\n            that.height\n        );\n    }\n}\n\nmodule.exports = Monster;\n\n//# sourceURL=webpack:///./src/components/Monster.js?");

/***/ }),

/***/ "./src/components/Sound.js":
/*!*********************************!*\
  !*** ./src/components/Sound.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Sound(src) {\n    this.sound = document.createElement(\"audio\");\n    this.sound.src = src;\n\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    this.sound.style.display = \"none\";\n    this.sound.loop = true;\n\n    this.mute = this.mute.bind(this);\n\n    document.body.appendChild(this.sound);\n}\n\nSound.prototype.play = function play() {\n    var playPromise = this.sound.play();\n\n    if (playPromise !== undefined) {\n            playPromise\n                .then(_ => { })\n                .catch(error => { })\n    }\n}\n\nSound.prototype.stop = function stop() {\n    this.sound.pause();\n}\n\nSound.prototype.mute = function mute(e) {\n    e.preventDefault();\n\n    let button = document.getElementById(\"mute\");\n\n    if (button.innerHTML === \"Mute\") {\n        this.stop();\n        button.innerHTML = \"Unmute\";\n    } else {\n        this.play();\n        button.innerHTML = \"Mute\";\n    }\n}\n\nmodule.exports = Sound;\n\n//# sourceURL=webpack:///./src/components/Sound.js?");

/***/ }),

/***/ "./src/components/Sprite.js":
/*!**********************************!*\
  !*** ./src/components/Sprite.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./Game */ \"./src/components/Game.js\");\n\nfunction Sprite(key, world, player, images, playCtx, handler) {\n    this.key = key;\n    this.world = world;\n    this.player = player;\n    this.images = images;\n    this.playCtx = playCtx;\n    this.handler = handler;\n\n    this.pos = {\n        'x': 39,\n        'y': 29\n    };\n\n    this.pos2 = {\n        'x': this.player.width / 2,\n        'y': this.player.height / 2\n    };\n\n    this.speed = {\n        'x': 1,\n        'y': 1\n    };\n\n    this.inventory = {\n        healing: [],\n        weapons: [\n            {\n                name: \"Fists\",\n                damage: 1\n            }\n        ]\n    };\n\n    this.weapons = {\n        \"Sword\": false,\n        \"Bow\": false,\n        \"Dagger\": false,\n        \"Spear\": false,\n        \"Lightening spell\": false,\n        \"Fire spell\": false,\n        \"Large stick\": false,\n        \"Small stick\": false,\n        \"Fists\": true\n    };\n\n    this.weapon = \"Fists\";\n    this.level = Game.levels[1];\n    this.health = 100;\n    this.defeated = 0;\n\n    this.img = this.images[this.key];\n    this.width = this.img.width;\n    this.height = this.img.height;\n}\n\nSprite.prototype.draw = function draw() {\n    this.playCtx.clearRect(0, 0, this.player.width, this.player.height);\n    \n    if (this.pos.x < 300) {\n        this.pos2.x = this.pos.x;\n    } else if (this.pos.x > this.world.width - 300) {\n        this.pos2.x = 600 - (this.world.width - this.pos.x);\n    } else {\n        this.pos2.x = this.player.width / 2;\n    }\n\n    if (this.pos.y < 250) {\n        this.pos2.y = this.pos.y;\n    } else if (this.pos.y > this.world.height - 250) {\n        this.pos2.y = 500 - (this.world.height - this.pos.y);\n    } else {\n        this.pos2.y = this.player.height / 2;\n    }\n\n    this.playCtx.drawImage(this.img, this.pos2.x, this.pos2.y);\n};\n\nSprite.prototype.addItem = function addItem(item) {\n    if (item.health) {\n        this.inventory.healing.push(item);\n        let menu = document.getElementById(\"menu\");\n        menu.innerHTML += `<div class='option' id='${item.name}'>${item.name} +${item.health}</div>`;\n    } else {\n        if (!this.weapons[item.name]) {\n            this.inventory.weapons.push(item);\n            this.weapons[item.name] = true;\n\n            let menu = document.getElementById(\"weapons\");\n            menu.innerHTML += `<div class='weapon' id='${item.name}'>${item.name} atk${item.damage}</div>`;\n        }\n    }\n}\n\nSprite.prototype.isChest = function isChest(chests) {\n    var myleft = this.pos.x;\n    var myright = this.pos.x + (this.width);\n    var mytop = this.pos.y;\n    var mybottom = this.pos.y + (this.height);\n\n    var chest = false;\n\n    for (let i = 0; chest || i < chests.length; i++) {\n        var chestleft = chests[i].x;\n        var chestright = chests[i].x + (chests[i].width);\n        var chesttop = chests[i].y;\n        var chestbottom = chests[i].y + (chests[i].height);\n\n        chest = true;\n        if ((chests[i].opened) || \n            (mybottom < chesttop) ||\n            (mytop > chestbottom) ||\n            (myright < chestleft) ||\n            (myleft > chestright)) {\n            chest = false;\n        }\n\n        if (chest) {\n            return chests[i];\n        }\n    }\n\n    return false;\n}\n\nSprite.prototype.isMonster = function isMonster(monsters) {\n    var myleft = this.pos.x;\n    var myright = this.pos.x + (this.width);\n    var mytop = this.pos.y;\n    var mybottom = this.pos.y + (this.height);\n\n    var monster = false;\n\n    for (let i = 0; monster || i < monsters.length; i++) {\n        var monsterleft = monsters[i].x;\n        var monsterright = monsters[i].x + (monsters[i].width);\n        var monstertop = monsters[i].y;\n        var monsterbottom = monsters[i].y + (monsters[i].height);\n\n        monster = true;\n        if ((monsters[i].beat) ||\n            (mybottom < monstertop) ||\n            (mytop > monsterbottom) ||\n            (myright < monsterleft) ||\n            (myleft > monsterright)) {\n            monster = false;\n        }\n\n        if (monster) {\n            return monsters[i];\n        }\n    }\n\n    return false;\n}\n\nSprite.prototype.heal = function heal(item) {\n    window.removeEventListener(\"click\", this.handler);\n\n    let newArr = [];\n\n    let found = false;\n\n    for (let i = 0; !found || i < this.inventory.healing.length; i++) {\n        found = true;\n        if (this.inventory.healing[i]) {\n            if (this.inventory.healing[i].name !== item.innerHTML) {\n                found = false;\n                newArr.push(this.inventory.healing[i]);\n            }\n        };\n\n        if (found) {\n            newArr.push(this.inventory.healing.slice(i + 1, this.inventory.healing.length + 1));\n            break;\n        }\n    }\n\n    this.inventory.healing = newArr.reduce((acc, val) => acc.concat(val), []);\n}\n\nmodule.exports = Sprite;\n\n//# sourceURL=webpack:///./src/components/Sprite.js?");

/***/ }),

/***/ "./src/components/StartMenu.js":
/*!*************************************!*\
  !*** ./src/components/StartMenu.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./Game */ \"./src/components/Game.js\");\nconst GameView = __webpack_require__(/*! ./GameView */ \"./src/components/GameView.js\");\nconst Sound = __webpack_require__(/*! ./Sound */ \"./src/components/Sound.js\");\n\nfunction StartMenu() {\n    this.startHandler = this.startHandler.bind(this);\n    this.playHandler = this.playHandler.bind(this);\n}\n\nStartMenu.prototype.title = function title() {\n    window.addEventListener(\"keyup\", this.startHandler);\n\n    this.music = new Sound(\"../assets/music/our_mountain.mp3\");\n    this.music.play();\n}\n\nStartMenu.prototype.startHandler = function startHandler(ev) {\n    if (ev.keyCode === 13) {\n        let canvas = document.getElementById(\"screenChange\");\n        canvas.innerHTML = \"<canvas id='viewport' width='600px' height='500px'></canvas><canvas id='player' width='600px' height='500px'></canvas><canvas id='fight' class='hide' width='600px' height='500px'></canvas><canvas id='health' width='600px' height='500px'></canvas><script type='application/javascript' src='./main.js'></script>\";\n        \n        let aside = document.getElementById(\"aside\");\n        aside.classList.remove(\"hide\");\n        \n        const viewport = document.getElementById(\"viewport\");\n        const player = document.getElementById(\"player\");\n        \n        const viewCtx = viewport.getContext(\"2d\");\n        const playCtx = player.getContext(\"2d\");\n\n        this.music.stop();\n        \n        const game = new Game();\n        new GameView(game, player, viewport, viewCtx, playCtx).init(['tile', 'player'], ['../assets/backgrounds/grass_tile.png', '../assets/characters/main_forward.png']);\n\n        this.start();\n    }\n}\n\nStartMenu.prototype.start = function start() {\n    window.removeEventListener(\"keyup\", this.startHandler);\n}\n\nStartMenu.prototype.playBtn = function playBtn() {\n    let btn = document.getElementById(\"play\");\n\n    btn.addEventListener(\"click\", this.playHandler);\n}\n\nStartMenu.prototype.playHandler = function playHandler(e) {\n    e.preventDefault();\n\n    let btn = document.getElementById(\"play\");\n    btn.classList.add(\"hide\");\n\n    let start = document.getElementById(\"startScreen\");\n    start.classList.remove(\"hide\");\n\n    this.play();\n}\n\nStartMenu.prototype.play = function play() {\n    window.removeEventListener(\"click\", this.playHandler);\n\n    this.title();\n}\n\nmodule.exports = StartMenu;\n\n//# sourceURL=webpack:///./src/components/StartMenu.js?");

/***/ }),

/***/ "./src/components/Text.js":
/*!********************************!*\
  !*** ./src/components/Text.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Text(width, height, color, x, y, ctx, text) {\n    this.width = width;\n    this.height = height;\n    this.color = color;\n    this.x = x;\n    this.y = y;\n    this.text = text;\n    this.ctx = ctx;\n}\n\nText.prototype.update = function update() {\n    this.ctx.font = this.width + \" \" + this.height;\n    this.ctx.fillStyle = this.color;\n    this.ctx.fillText(this.text, this.x, this.y);\n}\n\nmodule.exports = Text;\n\n//# sourceURL=webpack:///./src/components/Text.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const StartMenu = __webpack_require__(/*! ./components/StartMenu */ \"./src/components/StartMenu.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    new StartMenu().playBtn();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });