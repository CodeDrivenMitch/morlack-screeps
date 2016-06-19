var roleBuilder = require('./role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < 0.8 * structure.energyCapacity)
                }
            });

            if(!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter(structure) {
                        return structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storageCapacity;
                    }
                })
            }

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                roleBuilder.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;