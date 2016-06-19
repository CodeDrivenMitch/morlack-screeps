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
                    return structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax
                }
            });

            if (target) {
                if (creep.repair(target) !== OK) {
                    creep.moveTo(target);
                }
            } else {
                if(Game.spawns.Spawn1.energyAvailable < Game.spawns.Spawn1.energyCapacityAvailable) {
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter(structure) {
                            return structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) > 0;
                        }
                    });

                    var targetSpawn =  creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity)
                        }
                    });

                    if(target && targetSpawn) {
                       if(creep.carry.energy > 0) {
                           if(creep.transfer(targetSpawn) !== OK) {
                               creep.moveTo(targetSpawn);
                           }
                       } else {
                           if(targetSpawn.transfer(creep) !== OK) {
                               creep.moveTo(targetSpawn);
                           }
                       }
                    }
                } else {
                    roleBuilder.run(creep);
                }

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