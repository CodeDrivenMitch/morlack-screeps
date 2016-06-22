// Load extensions
require('./extension.creep');
require('./extension.room');
require('./extension.tower');
import MyGame from './my_game';

// Looad profiler
var profiler = require('./lib.profiler');
profiler.enable();

module.exports.loop = function () {
    
    // Wrap it in the profiler callback
    profiler.wrap(function() {
        PathFinder.use(true);
        
        
        MyGame.runMemoryChecks();
        MyGame.executeTowers();
        MyGame.executeCreeps();
    });

};