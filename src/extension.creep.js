/**
 * File with extensions for the Creep object
 */
Creep.prototype.shouldExecute = function() {
    if(this.memory.executing && this.carry.energy == 0) {
        this.memory.executing = false;
    }

    if(!this.memory.executing && this.carry.energy == this.carryCapacity) {
        this.memory.executing = true;
    }

    return this.memory.executing;
};

Creep.prototype.hasDestination = function() {
    return !!this.memory.destination;
};

/**
 * Retrieves the information about current target
 * @returns {Structure|Creep|boolean}
 */
Creep.prototype.getDesination = function() {
    return this.hasDestination() ? Game.getObjectById(this.memory.destination.id) : false;
};

/**
 * @returns {string}
 */
Creep.prototype.getDestinationType = function() {
    return this.hasDestination() ? this.memory.destination.type : 'none';
};

/**
 *
 * @param range {Number}
 */
Creep.prototype.shouldMove = function(range = 3) {
    if(this.fatigue === 0 && this.hasDestination()) {
        console.log(JSON.stringify(this.getDesination()));
        return this.pos.inRangeTo(this.getDesination(), range);
    }
    return false;
};

Creep.prototype.createPath = function() {
    let path = this.pos.findPathTo(this.getDesination());
    this.setPath(path);
    this.memory.path = path;
    return path;
};

Creep.prototype.destinationMoved = function() {
    if(this.memory.destination.type !== 'creep') {
        return false;
    }
    let currentDestination = this.getDesination();
    return !(currentDestination.pos.x == this.memory.destination.originalX && currentDestination.pos.y == this.memory.destination.originalY)
};

Creep.prototype.moveToTarget = function() {
    if(!this.hasPath() || this.destinationMoved()) {
        this.createPath()
    }

    this.moveByPath(this.getPath());
};

Creep.prototype.setDestination = function(destination, type) {
    this.memory.destination = {
        id: destination.id,
        originalX: destination.pos.x,
        originalY: destination.pos.y,
        type: type
    };
};

Creep.prototype.hasPath = function() {
    return !!this.memory.path && _.isString(this.memory.path);
};

Creep.prototype.setPath = function(path) {
    this.memory.path = Room.serializePath(path);
};

Creep.prototype.getPath = function() {
    return Room.deserializePath(this.memory.path);
};

/**
 Finder methods
 */

Creep.prototype.findClosestSource = function() {
    return this.pos.findClosestByRange(FIND_SOURCES);
};

Creep.prototype.findClosestHarvesterDestination = function() {
    let target = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity)
        }
    });
    
    // None needed? Put it in container
    if(!target) {
        target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter(structure) {
                return structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity;
            }
        });
    }
    
    return target;
};