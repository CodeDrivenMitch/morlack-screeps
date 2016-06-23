Creep.prototype.getDestinationPriorities = function(role) {
    switch(role.valueOf()) {
        case "harvester".valueOf():
            return [this.findClosestEmptyContainer];
        case "upgrader".valueOf():
            return [];
        case "builder".valueOf():
            return [];
        case "supplier".valueOf():
            return [this.findClosestEmptySpawnStructure, this.findClosestEmptyTower, this.findStorage];
        default:
            return [];
    }
};


Creep.prototype.findClosestSource = function () {
    return this.pos.findClosestByRange(FIND_SOURCES, {
        filter(source) {
            return source.energy > 0;
        }
    });
};

Creep.prototype.findStorage = function() {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });
};

Creep.prototype.findClosestFilledContainer = function () {
    let self = this;
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.energy >= self.carryCapacity);
        }
    });
};

Creep.prototype.findClosestEmptyTower = function() {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return structure.structureType == STRUCTURE_TOWER  && structure.energy < structure.energyCapacity * 0.75
        }
    });
};

Creep.prototype.findClosestEmptyContainer = function() {
    let self = this;
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter(structure) {
            return (structure.structureType == STRUCTURE_CONTAINER || structure.stuctureType == STRUCTURE_STORAGE) && _.sum(structure.store) < (structure.storeCapacity - self.carryCapacity);
        }
    });
};

Creep.prototype.findClosestEmptySpawnStructure = function() {
    return this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ) && structure.energy < structure.energyCapacity)
        }
    });
};

Creep.prototype.findClosestDestination = function (role) {
    let priorities = this.getDestinationPriorities(role);
    for(var i =  0; i < priorities.length; i++ ) {
        let result = priorities[i].apply(this);
        if(result) {
            return result;
        }
    }
    return false;
};