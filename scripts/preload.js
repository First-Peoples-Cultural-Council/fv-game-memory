import configManager from './config';
import Base from './base';

class Preload extends Base
{

    init()
    {
        this.config = configManager.getConfig();

        this.loadingBar = this.game.make.sprite(this.game.world.centerX, 500, "loading");
        this.logo = this.game.make.sprite(this.game.world.centerX, 250, 'brand');
        this.status = this.game.make.text(this.game.world.centerX, 450, 'Loading...', { fill: 'black' });

        this.centerObjects([this.logo, this.status, this.loadingBar]);
    }

    centerObjects(objects)
    {
        objects.forEach((obj) =>
        {
            obj.anchor.setTo(0.5, 0.5);
        });
    }

    preload()
    {
        this.add.existing(this.logo).scale.setTo(0.5);
        this.add.existing(this.loadingBar);
        this.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        var config = this.config;

        this.load.image('card', config.images.card);
        this.load.image('cardFlipped', config.images.cardFlipped);
        this.load.image('background', config.images.background);
        this.load.image('title', config.images.title);
        this.load.image('time', config.images.time);
        this.load.image('wellDone', config.images.wellDone);
        this.load.image('transp', config.images.transp);
        this.load.image('unmute', config.images.unmute);
        this.load.image('mute', config.images.mute);
        this.load.image('bubble', config.images.bubble);
        this.load.image('rightArrow', config.images.rightArrow);
        this.load.image('leftArrow', config.images.leftArrow);
        this.load.image('fullscreen', config.images.fullscreen);
        this.load.image('unfullscreen', config.images.unfullscreen);
        
        const categories = this.config.categories;

        for (let category in categories)
        {
            categories[category].map((card) =>
            {
                this.load.image(card.image, card.image);
                this.load.audio(card.audio, card.audio);
            });
        }
    }

    create()
    {
        this.switchState("Menu");
    }
}

export default Preload;
