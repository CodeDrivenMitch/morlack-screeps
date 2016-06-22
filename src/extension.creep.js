require('./extension.creep.finders');


require('./role.harvester');
require('./role.upgrader');
require('./role.builder');
require('./role.guard');

Creep.prototype.execute = function() {
    switch (this.memory.role) {
        case 'harvester':
            this.roleHarvester();
            break;
        case 'upgrader':
            this.roleUpgrader();
            break;
        case 'builder':
            this.roleBuilder();
            break;
        case 'guard':
            this.roleGuard();
            break;
        default:
            console.log("Creep " + this.name + ' has no role assigned!');
    }
};

/**
 * File with extensions for the Creep object
 */
Creep.prototype.shouldExecute = function () {
    if (this.memory.executing && this.carry.energy == 0) {
        this.memory.executing = false;
    }

    if (!this.memory.executing && this.carry.energy == this.carryCapacity) {
        this.memory.executing = true;
    }

    return this.memory.executing;
};

Creep.prototype.isTired = function() {
    return this.fatigue > 0;
};

Creep.prototype.hasDestination = function () {
    return !!this.memory.destination;
};

/**
 * Retrieves the information about current target
 * @returns {Structure|Creep|boolean}
 */
Creep.prototype.getDestination = function () {
    return this.hasDestination() ? Game.getObjectById(this.memory.destination.id) : false;
};

Creep.prototype.resetDestination = function () {
    delete this.memory.path;
    delete this.memory.destination;
};

/**
 * @returns {string}
 */
Creep.prototype.getDestinationType = function () {
    return this.hasDestination() ? this.memory.destination.type : 'none';
};

/**
 *
 * @param range {Number}
 */
Creep.prototype.shouldMove = function (range = 3) {
    return this.hasDestination() && !this.pos.inRangeTo(this.getDestination(), range);
};

Creep.prototype.createPath = function () {
        let path = this.pos.findPathTo(this.getDestination());
    this.setPath(path);
    return path;
};

Creep.prototype.destinationMoved = function () {
    if (this.memory.destination.type !== 'creep') {
        return false;
    }
    let currentDestination = this.getDestination();
    return !(currentDestination.pos.x == this.memory.destination.originalX && currentDestination.pos.y == this.memory.destination.originalY)
};

Creep.prototype.moveToTarget = function () {
    if(this.isTired()) {
        return;
    }
    if (!this.hasPath() || this.destinationMoved() || this.moveByPath(this.getPath()) !== OK) {
        this.createPath();
        this.moveByPath(this.getPath());
    }
};

Creep.prototype.setDestination = function (destination, type) {
    delete this.memory.path;
    console.log("New destination for " + this.name, JSON.stringify(destination));
    this.memory.destination = {
        id: destination.id,
        originalX: destination.pos.x,
        originalY: destination.pos.y,
        type: type ? type : 'none'
    };
};

Creep.prototype.hasPath = function () {
    return !!this.memory.path && _.isString(this.memory.path);
};

Creep.prototype.setPath = function (path) {
    this.memory.path = Room.serializePath(path);
};

Creep.prototype.getPath = function () {
    return Room.deserializePath(this.memory.path);
};
