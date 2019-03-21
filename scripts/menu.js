import configManager from './config';
import Base from './base';

class Menu extends Base 
{
    /**
    * Initializes the state/scene
    * Part of the Phaser Life Cycle
    */
    init()
    {
        this.config = configManager.getConfig();
        this.columns = 3;
        this.rows = 2;
        this.thumbWidth = 192;
        this.thumbHeight = 192;
        this.spacing = 50;
        this.categories = Object.keys(this.config.categories);
        this.pages = Math.ceil(this.categories.length / (this.rows * this.columns));
    }

    /**
     * Creates the state/scene
     * This is where all of the elements should be added to the scene
     * Part of the Phaser Life Cycle
     */
    create()
    {
        this.currentPage = 0;

        const categories = this.categories;
        const rowLength = this.thumbWidth * this.columns + this.spacing * (this.columns - 1);
        const leftMargin = (this.game.width - rowLength) / 2;
        const colHeight = this.thumbHeight * this.columns + this.spacing * (this.columns - 1);
        const topMargin = (this.game.width - colHeight) / 2;

        this.stage.backgroundColor = '#A5572C';

        this.createBackground();
        this.createNextButton();
        this.createPrevButton();
        this.createTitle();
        this.createMuteButton();

        this.scrollingMap = this.game.add.tileSprite(0, 240, this.pages.length * this.game.width, this.game.height, "transp");
        this.pageText = this.game.add.text(this.game.width / 2, 150, "Select a Category (1 / " + this.pages + ")", { font: "30px Arial", fill: "#FFFFFF" })
        this.pageText.anchor.set(0.5);

        let row = 0;
        let column = 0;
        let categoriesPerPage = (this.rows * this.columns);
        let page = 0;

        for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++)
        {
            var categoryPlacementIndex = categoryIndex + 1;
            var category = categories[categoryIndex];
            
            var thumbPositionX = page * this.game.width + leftMargin + column * (this.thumbWidth + this.spacing);
            var thumbPositionY = topMargin + row * (this.thumbHeight + this.spacing);
            
            var thumb = this.game.add.image(thumbPositionX, thumbPositionY, "bubble");
            thumb.anchor.setTo(0.5,0.5);
            
            var text = this.game.add.text(thumbPositionX, thumbPositionY, category);
            text.fill = '#000000';
            text.fontSize = '20px';
            text.anchor.setTo(0.5, 0.5);

            const categoryThumb = this.game.add.group();
            categoryThumb.add(thumb);
            categoryThumb.add(text);
            categoryThumb.x = 90;

            thumb.inputEnabled = true;
            thumb.events.onInputDown.add(this.categorySelected.bind(this, [category]), this);
            thumb.input.useHandCursor = true;

            this.scrollingMap.addChild(categoryThumb);

            this.game.add.tween(categoryThumb).to({ y: '-10' }, 2000, Phaser.Easing.Cubic.InOut, true, Math.random() * 2000, -1, true);

            column++;

            if ((categoryPlacementIndex % this.columns) == 0)
            {
                column = 0;
                row++;
            }

            if ((categoryPlacementIndex % categoriesPerPage) == 0)
            {
                page++;
                column = 0;
                row = 0;
            }
        }

        this.fadeIn();
    }

    /**
     * Creates a background
     */
    createBackground()
    {
        this.game.add.sprite(0, 0, 'background');
    }

    /**
     * Creates a title
     */
    createTitle()
    {
        this.title = this.add.sprite(0, 0, 'title');
        this.title.anchor.setTo(0.5);
        this.title.x = this.game.width / 2;
        this.title.y = 75;
    }

    /**
     * Creates next page button
     */
    createNextButton()
    {
        const rightArrow = this.add.sprite(this.game.width - 100, 100, 'rightArrow');
        rightArrow.anchor.setTo(0.5, 0.5);
        rightArrow.scale.setTo(0.5, 0.5);
        rightArrow.inputEnabled = true;
        rightArrow.events.onInputUp.add(this.nextPage, this);
        rightArrow.input.useHandCursor = true;
        this.rightArrow = rightArrow;
    }

    /**
     * Create prev page button
     */
    createPrevButton()
    {
        const leftArrow = this.add.sprite(100, 100, 'leftArrow');
        leftArrow.anchor.setTo(0.5, 0.5);
        leftArrow.scale.setTo(0.5, 0.5);
        leftArrow.inputEnabled = true;
        leftArrow.events.onInputUp.add(this.prevPage, this);
        leftArrow.input.useHandCursor = true;
        this.leftArrow = leftArrow;
    }

    /**
     * Category Selected
     * @param {object} category 
     */
    categorySelected(category)
    {
        this.play(category);
    }

    /**
     * Update 
     * Phaser Lifecycle 
     */
    update()
    {
        this.leftArrow.visible = true;
        this.rightArrow.visible = true;

        if (this.currentPage == 0)
        {
            this.leftArrow.visible = false;
        }

        if ((this.currentPage + 1) == this.pages)
        {
            this.rightArrow.visible = false
        }
    }
    

    /**
     * Go to next page 
     */
    nextPage()
    {
        if ((this.currentPage + 1) < this.pages)
        {
            this.changePage(1);
        }
    }

    /**
     * Prev page
     */
    prevPage()
    {
        if (this.currentPage != 0)
        {
            this.changePage(-1);
        }
    }

    /**
     * Page change
     * @param {number} page 
     */
    changePage(page)
    {
        this.currentPage += page;
        this.pageText.text = "Select a Category (" + (this.currentPage + 1).toString() + " / " + this.pages + ")";
        this.game.add.tween(this.scrollingMap).to({ x: this.currentPage * -this.game.width }, 300, Phaser.Easing.Cubic.Out, true);
    }

    play(category)
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
            this.stage.backgroundColor = '#FFFFFF';
            this.game.state.start("Main", true, false, this.config.categories[category]);
        });
        backgroundTween.start();
    }
}

export default Menu;
