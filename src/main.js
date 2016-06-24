// Load extensions
require('./extension.creep');
require('./extension.room');
require('./extension.tower');
require('./extension.roomobject');
import MyGame from './my_game';

module.exports.loop = function () {

    var myGame = new MyGame();
    
    myGame.checkSettings();
    myGame.executeSpawnCheck();
    myGame.executeTowers();
    myGame.executeCreeps();
};