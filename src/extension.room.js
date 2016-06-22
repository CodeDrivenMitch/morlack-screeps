let _ = require('lodash');

/**
 * Finds all towers in the room 
 */
Room.prototype.findAllActionableTowers = function() {
    return this.find(FIND_MY_STRUCTURES, {
        filter(structure) {
            return structure.structureType === STRUCTURE_TOWER;
        }
    })
};

/**
 * Finds all damaged structure in the current room
 * 
 * TODO: Cache this profitable?
 */
Room.prototype.findAllDamagedStructures = function() {
    return this.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax
        }
    });
};