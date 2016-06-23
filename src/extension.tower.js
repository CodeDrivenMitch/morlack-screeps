let _ = require('lodash');

StructureTower.prototype.execute = function() {
    if(this.energy < 10) {
        // Not enough energy to do anything, save cpu
        return;
    }

    let possibleTargets = this.room.findAllDamagedStructures();

    if(Memory.disableWallRepair) {
        possibleTargets = _.filter(possibleTargets, (possibleTarget) => {
            return possibleTarget.structureType !== STRUCTURE_WALL;
        })
    }
    let target = null;
    // Find target lowest on hits
    _.each(possibleTargets, (possibleTarget) => {
        if(target === null || target.hits > possibleTarget.hits) {
            target = possibleTarget;
        }
    });

    if (target) {
        this.repair(target);
    }
};