import Phaser from 'phaser';
import backgroundMenu from '../assets/gfx/backgroundMenu.png';

const gameState = {};
let menuItems = [
    {
        text: 'Start',
        type: 'start',
        selected: true
    },
    {
        text: 'Highscore',
        type: 'score',
        selected: false
    },
    {
        text: 'Exit',
        type: 'end',
        selected: false
    }
];

const menuItemsText = [];
let down;
let up;
let spacebar;

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('backgroundMenu', backgroundMenu);
    }

    create() {
        this.add.image(230, 325, 'backgroundMenu');
        let startingMenuY = 490;


        gameState.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(160, 400, 'Kapitan Zych Touhou', { fontSize: '23px', fontFamily: 'Arial' })

        menuItems.map((item, key) => {
            menuItemsText[key] = this.add.text(215, startingMenuY, item.selected ? "> " + item.text : "  " + item.text, {fontFamily: 'Arial'});
            startingMenuY += 40;
        });
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(down)) {
            const currentMenuItem = menuItems.findIndex(menuItem => {
                if (menuItem.selected === true)
                    return menuItem;

            });
            if (currentMenuItem !== -1) {
                menuItems[currentMenuItem].selected = false;
                menuItemsText[currentMenuItem].setText(" " + menuItems[currentMenuItem].text);
                if (menuItems[currentMenuItem + 1] !== undefined) {
                    menuItems[currentMenuItem + 1].selected = true;
                    menuItemsText[currentMenuItem + 1].setText("> " + menuItems[currentMenuItem + 1].text);
                }
                else {
                    menuItems[0].selected = true;
                    menuItemsText[0].setText("> " + menuItems[0].text);
                }
            }

        }
        else if (Phaser.Input.Keyboard.JustDown(up)) {
            const currentMenuItem = menuItems.findIndex(menuItem => {
                if (menuItem.selected === true)
                    return menuItem;

            });
            if (currentMenuItem !== -1) {
                menuItems[currentMenuItem].selected = false;
                menuItemsText[currentMenuItem].setText(" " + menuItems[currentMenuItem].text);
                if (menuItems[currentMenuItem - 1] !== undefined) {
                    menuItems[currentMenuItem - 1].selected = true;
                    menuItemsText[currentMenuItem - 1].setText("> " + menuItems[currentMenuItem - 1].text);
                }
                else {
                    menuItems[menuItems.length -1].selected = true;
                    menuItemsText[menuItems.length-1].setText("> " + menuItems[menuItems.length-1].text);
                }
            }

        }

        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            const currentMenuItem = menuItems.findIndex(menuItem => {
                if (menuItem.selected === true)
                    return menuItem;

            });
            this.scene.stop();
            if (menuItems[currentMenuItem].type === 'start') {
                this.scene.start('level1scene')
            }
        }
    }


}


export default MenuScene;