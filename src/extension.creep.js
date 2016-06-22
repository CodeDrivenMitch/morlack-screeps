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
            break;
    }
};

/**
 * File with extensions for the Creep object
 */
Creep.prototype.shouldExecute = function () {
    if (this.memory.shouldExecute && this.carry.energy == 0) {
        this.memory.shouldExecute = false;
    }

    if (!this.memory.shouldExecute && this.carry.energy == this.carryCapacity) {
        this.memory.shouldExecute = true;
    }

    return this.memory.shouldExecute;
};

Creep.prototype.isTired = function() {
    return this.fatigue > 0;
};

Creep.prototype.hasDestination = function () {
    return !!this.memory.destination;
};

Creep.prototype.isDestinationType = function(type) {
    return _.isEqual(this.getDestinationType().valueOf(), type.valueOf())
};

/**
 * Retrieves the information about current target
 * @returns {Structure|Creep|boolean}
 */
Creep.prototype.getDestination = function () {
    return this.hasDestination() ? Game.getObjectById(this.memory.destination.id) : false;
};

/**
 * @returns {string}
 */
Creep.prototype.getDestinationType = function () {
    return this.hasDestination() ? this.memory.destination.type : 'none';
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

    let destination = this.getDestination();
    this.moveTo(destination);
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