import CreepManager from './manager.creep';
import MemoryManager from './manager.memory';

module.exports.loop = function () {
    let managers = [new MemoryManager(), new CreepManager()];

    _.each(managers, function(manager) {
        if(manager.shouldExecute()) {
            manager.manage();
        }
    });
};