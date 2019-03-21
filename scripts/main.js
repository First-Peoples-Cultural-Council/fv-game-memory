import configManager from './config';
import Base from './base';

class Main extends Base
{
    /**
     * Initializes the state/scene
     * Part of the Phaser Life Cycle
     */
    init(categoryWords)
    {
        this.words = categoryWords;
        this.config = configManager.getConfig();
        this.firstCardChoice = false;
        this.secondCardChoice = false;
        this.cards = this.shuffleCards();
        this.wait = false;
    }

    /**
     * Creates the state/scene
     * This is where all of the elements should be added to the scene
     * Part of the Phaser Life Cycle
     */
    create() 
    {
        this.game.add.sprite(0, 0, 'background');
        this.allCards = this.add.group();
        this.complete = false;
        
        //  The Well Done sprite that appears on completion
        this.wellDone = this.add.sprite(0, 0, 'wellDone');
        this.wellDone.centerX = this.world.centerX;
        this.wellDone.visible = false;
        
        this.createCards();
        this.createTitle();
        this.createTimer();
        this.createFooter();
        this.createMuteButton();
        this.fadeIn();
    }

    /**
     * Shuffles Cards
     */
    shuffleCards()
    {
        let cards = this.sampleCards(this.words, 5);

        cards = cards.concat(cards.slice(0));

        for (let i = cards.length; i; i--) 
        {
            let j = Math.floor(Math.random() * i);
            [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
        }

        return cards;
    }

    /**
     * Returns a random n set of cards 
     * @param {array} cards 
     * @param {number} n 
     */
    sampleCards(cards, n) 
    {
        const result = [];

        cards = cards.slice(0);

        for (let i = 0; i < n; i++)
        {
            const cardsCount = cards.length;
            const randomIndex = Math.floor(Math.random() * (cardsCount));
            const card = cards.splice(randomIndex, 1);

            result.push(card[0]);
        }

        return result;
    }

    /**
     * Creates title text
     */
    createTitle()
    {
        this.title = this.add.sprite(0, 0, 'title');
        this.title.anchor.setTo(0.5);
        this.title.x = this.game.width / 2;
        this.title.y = 75;
    }

    /**
     * Creates timer text
     */
    createTimer()
    {
        this.timer = this.add.text(0, 0, 'test', { font: "40px Arial", fill: "#000000", align: "center" });
        this.timer.x = 230;
        this.timer.y = 577;
        this.timeTitle = this.add.sprite(0, 0, 'time');
        this.timeTitle.anchor.setTo(0.5);
        this.timeTitle.x = 150;
        this.timeTitle.y = 600;
        this.startTime = Date.now();
    }

    /**
     * Creates the footer
     */
    createFooter()
    {
        const graphics = this.add.graphics(0, 0);
        graphics.lineStyle(4, 0xFFFFFF, 1);
        graphics.moveTo(30, this.game.height - 45);
        graphics.lineTo(this.game.width - 30, this.game.height - 45);
        this.createTextButton(80, this.game.height - 20, 'Menu', this.gotoMenu.bind(this));
        this.createTextButton(this.game.width - 110, this.game.height - 20, 'Reveal Cards', this.solve.bind(this));
    }

    /**
     * Goto menu
     */
    gotoMenu()
    {
        this.switchState("Menu");
    }

    /**
     * Flips all of the cards
     */
    solve()
    {
        this.complete = true;
        this.allCards.callAll('flipCard');
    }

    /**
     * Creates a text button
     * @param {number} x - X Position
     * @param {number} y - Y Position
     * @param {string} text
     * @param {Function} onClick - Callback function
     */
    createTextButton(x, y, text, onClick)
    {
        let button = this.add.text(x, y, text);
        button.anchor.set(0.5);
        button.font = 'Arial';
        button.fontSize = 25;
        button.fill = '#000000';
        button.stroke = '#FFFFFF';
        button.strokeThickness = 4;
        button.inputEnabled = true;
        button.input.useHandCursor = true;
        button.resolution = 2;

        button.events.onInputDown.add(() =>
        {
            button.scale.setTo(1.1);
            onClick();
        })

        button.events.onInputUp.add(() =>
        {
            button.scale.setTo(1);
        })
    }

    /**
     * Creates a card given card data
     * @param {*} cardData 
     */
    createCard(cardData)
    {
        const card = this.add.group();

        const cardSprite = this.game.make.sprite(0, 0, 'card');
        cardSprite.inputEnabled = true;
        cardSprite.input.useHandCursor = true;
        cardSprite.anchor.setTo(0.5, 0.5);
        cardSprite.events.onInputDown.add(this.chooseCard.bind(this, card));

        const cardFlipped = this.game.make.sprite(0, 0, 'cardFlipped');
        cardFlipped.anchor.setTo(0.5, 0.5);
        cardFlipped.visible = false;

        const cardContents = this.add.group();

        const itemImage = this.game.make.sprite(0, 0, cardData.image);
        itemImage.anchor.setTo(0.5, 0.5);
        itemImage.x = 0
        itemImage.y = 0
        itemImage.height = 100;
        itemImage.scale.setTo(0.5);

        const word = this.game.make.text(0, 0, cardData.word, { font: "12px Arial", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth: 100 });
        word.anchor.setTo(0.5);
        word.y = -65;

        const translation = this.game.make.text(0, 0, cardData.translation, { font: "12px Arial", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth: 100 });
        translation.anchor.setTo(0.5);
        translation.y = 65;

        cardContents.add(itemImage);
        cardContents.add(word);
        cardContents.add(translation);
        cardContents.visible = false;

        card.add(cardSprite);
        card.add(cardFlipped);
        card.add(cardContents);

        card.showing = false;
        card.cardContents = cardContents;
        card.unflippedCardImage = cardSprite;
        card.flippedCardImage = cardFlipped;
        card.cardData = cardData;
        card.flipCardBack = this.flipCardBack.bind(this, card);
        card.flipCard = this.flipCard.bind(this, card);
        return card;
    }


    /**
     * Chooses a card 
     * @param {object} card 
     */
    chooseCard(card)
    {
        if (this.wait === false)
        {
            this.wait = true;
            card.flipCard();
        }
    }

    /**
     * Flips a card
     * @param {object} card 
     */
    flipCard(card)
    {
        if (card.showing === false)
        {
            const tween = this.game.add.tween(card.scale);
            tween.to({ x: 0 }, 500, Phaser.Easing.Cubic.InOut);
            tween.onComplete.addOnce(this.showCard.bind(this, card));
            tween.start();
        }
    }

    /**
     * Flips a card back
     * @param {object} card 
     */
    flipCardBack(card)
    {
        const tween = this.game.add.tween(card.scale);
        tween.to({ x: 0 }, 500, Phaser.Easing.Cubic.InOut);
        tween.onComplete.addOnce(this.hideCard.bind(this, card));
        tween.start();
    }

    /**
     * Shows a card
     * @param {*} card 
     */
    showCard(card)
    {
        card.unflippedCardImage.visible = false;
        card.flippedCardImage.visible = true;
        card.cardContents.visible = true;
        card.showing = true;

        const tween = this.game.add.tween(card.scale);
        tween.to({ x: 1 }, 500, Phaser.Easing.Cubic.InOut);
        tween.onComplete.addOnce(this.checkCards.bind(this, card));
        tween.start();
    }

    /**
     * Hides a card
     * @param {object} card 
     */
    hideCard(card)
    {
        card.unflippedCardImage.visible = true;
        card.flippedCardImage.visible = false;
        card.cardContents.visible = false;
        card.showing = false;

        const tween = this.game.add.tween(card.scale);
        tween.to({ x: 1 }, 500, Phaser.Easing.Cubic.InOut);
        tween.start();
    }

    /**
     * Checks cards
     * @param {object} card 
     */
    checkCards(card)
    {
        if (this.complete === false)
        {
            if (this.firstCardChoice === false)
            {
                this.firstCardChoice = card;
            }
            else if (this.secondCardChoice === false)
            {
                this.secondCardChoice = card;
            }

            if (this.firstCardChoice !== false && this.secondCardChoice !== false)
            {
                if (this.firstCardChoice.cardData.word === this.secondCardChoice.cardData.word)
                {
                    const audio = this.game.add.audio(this.firstCardChoice.cardData.audio);
                    audio.play();
                }
                else
                {
                    this.firstCardChoice.flipCardBack();
                    this.secondCardChoice.flipCardBack();
                }

                this.firstCardChoice = false;
                this.secondCardChoice = false;
            }

            let complete = true;
            this.allCards.forEach((card) =>
            {
                if (card.showing === false)
                {
                    complete = false;
                }
            })

            if (complete)
            {
                this.complete = true;
                this.showGameWon();
            }

            this.wait = false;
        }
    }

    /**
     * Creates cards
     */
    createCards()
    {
        this.cards.map((card) =>
        {
            this.allCards.add(this.createCard(card));
        });

        this.allCards.align(5, 3, 135, 207, Phaser.CENTER);
        this.allCards.x = 65;
        this.allCards.y = 130;
    }

    /**
     * Update the current scene/state
     * Part of the Phaser Life Cycle
     */
    update() 
    {
        if (this.complete === false)
        {
            this.updateTimer();
        }
    }

    /**
     * Updates the timer
     */
    updateTimer() 
    {
        const now = Date.now();
        const timeDiff = now - this.startTime;

        let minutes = Math.floor(timeDiff / 60000) % 60;
        let seconds = Math.floor(timeDiff / 1000) % 60;
        let time = '';

        if (seconds < 10)
        {
            seconds = '0' + seconds;
        }

        time = seconds;

        if (minutes < 10)
        {
            minutes = '0' + minutes;
        }

        time = minutes + ':' + seconds;

        this.timer.setText(time);
    }

    /**
     * Shows game end logo
     */
    showGameWon() 
    {
        this.wellDone.y = 0;
        this.wellDone.visible = true;
        this.add.tween(this.wellDone).to({ y: 250 }, 1500, "Bounce.easeOut", true);
    }
}

export default Main;