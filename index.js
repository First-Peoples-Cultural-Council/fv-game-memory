import Memory from './scripts/game';

document.addEventListener("DOMContentLoaded", function(event) {
    const gameContainer = document.getElementById('game');
    Memory.init(gameContainer,{});
});