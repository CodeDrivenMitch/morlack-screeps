// Load extensions
require('./extension.creep');
require('./extension.room');
require('./extension.tower');
import MyGame from './my_game';

module.exports.loop = function () {
    let myGame = new MyGame();
    myGame.runMemoryChecks();
    myGame.executeTowers();
    myGame.executeCreeps();
};