// Load extensions
require('./extension.creep');
var profiler = require('./lib.profiler');

import CreepManager from './manager.creep';
import MemoryManager from './manager.memory';
import TowerManager from './manager.tower';

profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function() {
        PathFinder.use(true);
        let managers = [new MemoryManager(), new CreepManager(), new TowerManager()];

        _.each(managers, function(manager) {
            if(manager.shouldExecute()) {
                manager.manage();
            }
        });
    });

};