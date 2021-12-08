import React, { useEffect, useState, useRef } from 'react';
import loadPhaser from './LoadPhaser.js';

import memory from '@fpcc/fv-game-memory';

// Load defaults from 'fv-game-memory'
import preloaderLoading from '@fpcc/fv-game-memory/www/assets/images/loading.png';
import preloaderLogo from '@fpcc/fv-game-memory/www/assets/images/load.png';
import background from '@fpcc/fv-game-memory/www/assets/images/background.png';
import card from '@fpcc/fv-game-memory/www/assets/images/card.png';
import cardFlipped from '@fpcc/fv-game-memory/www/assets/images/card_flipped.png';
import wellDone from '@fpcc/fv-game-memory/www/assets/images/well-done.png';
import title from '@fpcc/fv-game-memory/www/assets/images/title.png';
import time from '@fpcc/fv-game-memory/www/assets/images/time.png';
import transp from '@fpcc/fv-game-memory/www/assets/images/transp.png';
import mute from '@fpcc/fv-game-memory/www/assets/images/mute.png';
import unmute from '@fpcc/fv-game-memory/www/assets/images/unmute.png';
import bubble from '@fpcc/fv-game-memory/www/assets/images/bubble.png';
import rightArrow from '@fpcc/fv-game-memory/www/assets/images/right_arrow.png';
import leftArrow from '@fpcc/fv-game-memory/www/assets/images/left_arrow.png';
import unfullscreen from '@fpcc/fv-game-memory/www/assets/images/unfullscreen.png';
import fullscreen from '@fpcc/fv-game-memory/www/assets/images/fullscreen.png';

// Load custom game config
import custom_background from './gameAssets/milky-way-g60c09fe55_1280.jpeg';
import custom_wellDone from './gameAssets/like-gc40a4b256_640.png';

import './App.css';

function App() {

  const sampleWords = [
    {
        word: 'ímet',
        translation: 'step on it',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/cdfeaddf-24c4-48d7-b9a6-6ff08cf96308/picture:views/2/content/Medium_steps.jpg?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/79d01f16-c689-4e9b-8cb4-68a4c1531b84/file:content/1309h.mp3?inline=true'
    },
    {
        word: 'ímexyósem',
        translation: 'to go for a walk',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/59379cd8-78fd-4232-860e-68fe0a611408/file:content/enter-vb.gif?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/5e13410d-851d-4623-a2f7-1284819f06ff/file:content/573h.mp3?inline=true'
    },
    {
        word: 'íchxwò',
        translation: 'to stay behind, stay right here.',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/0fd89d44-984e-40dd-8de8-7e14f5236586/picture:views/2/content/Medium_c_9_14.jpg?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/deb36ff6-7bdd-4051-972a-1f7bdec10e26/file:content/ichxwo.mp3?inline=true'
    },
    {
        word: 'í\'ly',
        translation: 'cute (little thing)',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/283db72a-aea0-4dc4-88b3-486655d0e501/picture:views/2/content/Medium_cute.jpg?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/d9580a9b-34b7-4fe3-96a6-3962a680ce20/file:content/1886h.mp3?inline=true'
    },
    {
        word: 'íkw\'et',
        translation: 'throw (it) away',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/0ab26e04-9cc6-414c-b013-e9777188f0fd/picture:views/2/content/Medium_Long_vowelsK2c.jpg?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/1e185166-7936-4a98-a169-3d64455cdac7/file:content/198h.mp3?inline=true'
    },
    {
        word: 'í:lhtel',
        translation: 'eat',
        image: 'https://www.firstvoices.com/nuxeo/nxfile/default/7b59c684-4e95-47f1-9169-fa05322c476a/file:content/eat-vb.gif?inline=true',
        audio: 'https://www.firstvoices.com/nuxeo/nxfile/default/930aa28a-fe07-46a9-9837-1f1887f04ca9/file:content/verbs06.mp3?inline=true'
    }
];

  const gameConfig = {
    images: {
      preloaderLoading: preloaderLoading,
      preloaderLogo: preloaderLogo,
      background: background,
      card: card,
      cardFlipped: cardFlipped,
      wellDone: wellDone,
      title: title,
      time: time,
      transp: transp,
      mute: mute,
      unmute: unmute,
      bubble: bubble,
      rightArrow: rightArrow,
      leftArrow: leftArrow,
      unfullscreen: unfullscreen,
      fullscreen: fullscreen,
    },
    categories: {
        "People": sampleWords,
        "Things": sampleWords,
        "Nature": sampleWords,
        "Animals": sampleWords,
        "Winter": sampleWords,
        "Summer": sampleWords,
        "Technology": sampleWords,
        "Kids": sampleWords,
    }
  }

  const customGameConfig = {
    images: {
      ...gameConfig.images,
      background: custom_background,
      wellDone: custom_wellDone
    },
    categories: { ...gameConfig.categories }
  }

  const gameContainer = useRef(null);

  const [loaded, setLoaded] = useState(false);

  const handleSetCustomGameConfig = function () {
    memory.init(gameContainer?.current, customGameConfig)
  }

  useEffect(() => {
    loadPhaser(() => {
      memory.init(gameContainer?.current, gameConfig)
      setLoaded(true);
    });
  });

  return (
    <div>
    <div className="App">
      <header className="App-header">
        <p>Edit <code>src/App.js</code> and save to reload. {loaded ? <span>Phaser loaded!</span> : ''}</p>
        <div ref={gameContainer} style={{width: "80%", height: "80vh"}}></div>
        <button onClick={handleSetCustomGameConfig}>Load Custom Game Config</button>
      </header>
    </div>
    </div>
  );
}

export default App;
