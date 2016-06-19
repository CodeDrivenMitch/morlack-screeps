var roleBuilder = require('./role.builder');


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if(creep.memory.repairing) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax
                }
            });

            if (target) {
                if (creep.repair(target) !== OK) {
                    creep.moveTo(target);
                }
            } else {
                roleBuilder.run(creep);
            }

        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }


        if (creep.carry.energy < creep.carryCapacity) {

        }
        else {

        }
    }
};

module.exports = roleHarvester;