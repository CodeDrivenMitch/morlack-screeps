// Load extensions
require('./extension.creep');

import CreepManager from './manager.creep';
import MemoryManager from './manager.memory';
import TowerManager from './manager.tower';

module.exports.loop = function () {
    let managers = [new MemoryManager(), new CreepManager(), new TowerManager()];

    _.each(managers, function(manager) {
        if(manager.shouldExecute()) {
            manager.manage();
        }
    });
};