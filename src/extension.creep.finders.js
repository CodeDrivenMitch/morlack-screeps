let C = require('./constants');

/**
 * Looks up the destination priorities for a certain target type
 * @param {string} targetType Type of target, one of TARGET_*
 * @returns {Array<function>}
 */
Creep.prototype.getDestinationPriorities = function (targetType) {
    switch (targetType) {
        case C.TARGET_HARVESTER_SOURCE:
            return [this.findClosestSource];
        case C.TARGET_HARVESTER_CONTAINER:
            return [this.findClosestEmptyContainer, this.findClosestEmptySpawnStructure];
        case C.TARGET_UPGRADER_UPGRADE:
            return [this.findRoomController];
        case C.TARGET_UPGRADER_SOURCE:
            return [this.findClosestFilledContainer(), this.findClosestSource];
        case C.TARGET_BUILDER_BUILD:
            return [this.findClosestBuildingSite];
        case C.TARGET_BUILDER_SOURCE:
            return [this.findClosestFilledContainer(), this.findClosestSourceWithEmptySlot];
        case C.TARGET_SUPPLIER_PUT:
            return [this.findClosestEmptySpawnStructure, this.findClosestEmptyTower, this.findStorage];
        case C.TARGET_SUPPLIER_GET:
            return [this.findClosestFilledContainer()];
        default:
            return [];
    }
};

Creep.prototype.findRoomController = function () {
    return this.room.controller;
};

Creep.prototype.findClosestSourceWithEmptySlot = function (range = -1) {
    let self = this;
    return function () {
        return this.pos.findClosestByRange(FIND_SOURCES, {
            filter(source) {
                return (source.energy > 0)
                    && (source.hasEmptySlot())
                    && (range === -1 || self.pos.inRangeTo(source, range));
            }
        });
    }
};

Creep.prototype.findClosestSource = function () {
    return this.pos.findClosestByRange(FIND_SOURCES, {
        filter(source) {
            return source.energy > 0;
        }
    });
};

Creep.prototype.findStorage = function () {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });
};

Creep.prototype.findClosestFilledContainer = function (range = -1) {
    let self = this;
    // Wrap it in a function so we can set the range variable
    return function () {
        return self.pos.findClosestByRange(FIND_STRUCTURES, {
            filter(structure) {
                return (structure.structureType == STRUCTURE_CONTAINER)
                    && (structure.store.energy >= self.carryCapacity)
                    && (range === -1 || self.pos.inRangeTo(structure, range));
            }
        });
    }
};

Creep.prototype.findClosestEmptyTower = function () {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity * 0.75
        }
    });
};

Creep.prototype.findClosestEmptyContainer = function () {
    let self = this;
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return (structure.structureType == STRUCTURE_CONTAINER || structure.stuctureType == STRUCTURE_STORAGE) && (_.sum(structure.store) < (structure.storeCapacity - self.carryCapacity));
        }
    });
};

Creep.prototype.findClosestEmptySpawnStructure = function () {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ) && structure.energy < structure.energyCapacity)
        }
    });
};

Creep.prototype.findClosestBuildingSite = function () {
    return this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
};

Creep.prototype.findClosestDestination = function (role) {
    console.log("Finding targets for type... " + role);
    let priorities = this.getDestinationPriorities(role);
    for (var i = 0; i < priorities.length; i++) {
        let result = priorities[i].apply(this);
        if (result) {
            return result;
        }
    }
    return false;
};