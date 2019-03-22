class Base
{
    init()
    {

    }

    create()
    {

    }

    update()
    {

    }

    /**
     * Creates mute button control
     */
    createMuteButton()
    {
        const unmuteButton = this.add.sprite(40, 40, 'unmute');
        unmuteButton.anchor.setTo(0.5, 0.5);
        unmuteButton.scale.setTo(0.3, 0.3);
        unmuteButton.inputEnabled = true;
        unmuteButton.visible = this.game.sound.mute;
        unmuteButton.input.useHandCursor = true;

        const muteButton = this.add.sprite(40, 40, 'mute');
        muteButton.anchor.setTo(0.5, 0.5);
        muteButton.scale.setTo(0.3, 0.3);
        muteButton.inputEnabled = true;
        muteButton.visible = !this.game.sound.mute;
        muteButton.input.useHandCursor = true;

        unmuteButton.events.onInputUp.add(() =>
        {
            muteButton.visible = true;
            unmuteButton.visible = false;
            this.game.sound.mute = false;
        });

        muteButton.events.onInputDown.add(() =>
        {
            unmuteButton.visible = true;
            muteButton.visible = false;
            this.game.sound.mute = true;
        });
    }

    createFullscreenButton()
    {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        const fullscreen = this.add.sprite(this.game.width - 50, 40, 'fullscreen');
        fullscreen.anchor.setTo(0.5, 0.5);
        fullscreen.scale.setTo(0.3, 0.3);
        fullscreen.inputEnabled = true;
        fullscreen.visible = !this.game.scale.isFullScreen;
        fullscreen.input.useHandCursor = true;

        const unfullscreen = this.add.sprite(this.game.width - 50, 40, 'unfullscreen');
        unfullscreen.anchor.setTo(0.5, 0.5);
        unfullscreen.scale.setTo(0.3, 0.3);
        unfullscreen.inputEnabled = true;
        unfullscreen.visible = this.game.scale.isFullScreen;
        unfullscreen.input.useHandCursor = true;

        fullscreen.events.onInputUp.add(() =>
        {
            unfullscreen.visible = true;
            fullscreen.visible = false;
            this.game.scale.startFullScreen(false);
        });

        unfullscreen.events.onInputDown.add(() =>
        {
            fullscreen.visible = true;
            unfullscreen.visible = false;
            this.game.scale.stopFullScreen();
        });
    }

    /**
     * Creates a "fade in" effect
     */
    fadeIn()
    {
        const fadeBackground = this.game.add.graphics(0, 0);
        fadeBackground.beginFill(0xFFFFFF, 1);
        fadeBackground.drawRect(0, 0, this.game.width, this.game.height);
        fadeBackground.alpha = 1;
        fadeBackground.endFill();

        const backgroundTween = this.game.add.tween(fadeBackground);
        backgroundTween.to({ alpha: 0 }, 500, null);
        backgroundTween.onComplete.add(() =>
        {
            fadeBackground.destroy();
        });
        backgroundTween.start();
    }

    /**
     * Switches state while fading out
     * @param {string} state 
     */
    switchState(state)
    {
        const fadeBackground = this.game.add.graphics(0, 0);
        fadeBackground.beginFill(0xFFFFFF, 1);
        fadeBackground.drawRect(0, 0, this.game.width, this.game.height);
        fadeBackground.alpha = 0;
        fadeBackground.endFill();

        const backgroundTween = this.game.add.tween(fadeBackground);
        backgroundTween.to({ alpha: 1 }, 500, null);
        backgroundTween.onComplete.add(() =>
        {
            this.game.state.start(state);
        }, this);
        backgroundTween.start();
    }

}

export default Base;