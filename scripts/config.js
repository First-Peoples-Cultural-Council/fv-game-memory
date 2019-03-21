let defaultGameConfig = {

    images: {
        preloaderLoading: 'assets/images/loading.png',
        preloaderLogo: 'assets/images/logo.png',
        background: 'assets/images/background.png',
        card: 'assets/images/card.png',
        cardFlipped: 'assets/images/card_flipped.png',
        title: 'assets/images/title.png',
        time: 'assets/images/time.png',
        wellDone: 'assets/images/well-done.png',
        transp: 'assets/images/transp.png',
        mute:'assets/images/mute.png',
        unmute:'assets/images/unmute.png',
        bubble:'assets/images/bubble.png',
        rightArrow:'assets/images/right_arrow.png',
        leftArrow:'assets/images/left_arrow.png',
    },

    categories: {
        "People": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 2',
                translation: 'english translation',
                image: 'assets/images/example/2.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 3',
                translation: 'english translation',
                image: 'assets/images/example/3.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 4',
                translation: 'english translation',
                image: 'assets/images/example/4.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 5',
                translation: 'english translation',
                image: 'assets/images/example/5.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 6',
                translation: 'english translation',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 7',
                translation: 'english translation',
                image: 'assets/images/example/2.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 8',
                translation: 'english translation',
                image: 'assets/images/example/3.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 9',
                translation: 'english translation',
                image: 'assets/images/example/4.png',
                audio: 'assets/sounds/sample.mp3'
            },
            {
                word: 'Word 10',
                translation: 'english translation',
                image: 'assets/images/example/5.png',
                audio: 'assets/sounds/sample.mp3'
            }
        ],
        
        "Things": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things1": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things2": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things3": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things4": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things5": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
        "Things7": [
            {
                word: 'Word 1 asdasda dadadasd ad a',
                translation: 'english translation long sentence',
                image: 'assets/images/example/1.png',
                audio: 'assets/sounds/sample.mp3'
            },
        ],
    }

};

let gameConfig = {};

export default {

    setConfig: (config) => {
        gameConfig = Object.assign({}, defaultGameConfig, config, gameConfig);
    },

    reset: () => {
        gameConfig = {};
    },

    getConfig: () => {
        return gameConfig;
    }
}