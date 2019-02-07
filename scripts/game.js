//Scenes
import Boot from './boot';
import Preload from './preload';
import GameTitle from './gametitle';
import Main from './main';
import GameOver from './gameover';
import GameConfig from './config';

/**
 * Memory Game
 */
class Game {

    /**
     * Initialize the game
     * @param {HtmlElement} containerElement 
     * @param {object} config 
     */
    init(containerElement, config) {
        this.destroy();

        //Set Game Config
        GameConfig.setConfig(config);

        //Start Game
        const game = new Phaser.Game(800, 680, Phaser.CANVAS, containerElement, null, false, false);
        game.state.add("Boot", Boot);
        game.state.add("Preload", Preload);
        game.state.add("GameTitle", GameTitle);
        game.state.add("Main", Main);
        game.state.add("GameOver", GameOver);
        game.state.start("Boot");

        this.game = game;
    }

    /**
     * Destroys the current game instance
     * This will clean up memory
     */
    destroy() {
        GameConfig.reset();
        if (this.game) {
            this.game.destroy();
            this.game = null;
        }
    }

}

export default new Game();