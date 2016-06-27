let _ = require('lodash');

StructureTower.prototype.getMemory = function() {
    if(!Memory.towers) {
        Memory.towers = {};
    }

    if(!Memory.towers[this.id]) {
        Memory.towers[this.id] = {};
    }

    return Memory.towers[this.id];
};

StructureTower.prototype.execute = function() {
    if(this.energy < 10) {
        // Not enough energy to do anything, save cpu
        return;
    }

    // Try to attack
    var attackTarget = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (attackTarget) {
        this.attack(attackTarget);
        return;
    }

    if(this.getMemory().repairDisabled) {
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