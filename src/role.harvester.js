let C = require('./constants');

Creep.prototype.roleHarvesterDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? C.TARGET_HARVESTER_CONTAINER : C.TARGET_HARVESTER_SOURCE;

    if(    (destination === false)
        || (this.isDestinationType(destinationType) === false)
        || (executing && (destination.structureType === STRUCTURE_CONTAINER || destination.structureType === STRUCTURE_STORAGE) && (_.sum(destination.store) > (destination.storeCapacity - this.carryCapacity)))
        || (executing && (destination.structureType === STRUCTURE_SPAWN || destination.structureType === STRUCTURE_EXTENSION) && (destination.energy > (destination.energyCapacity - this.carryCapacity)))
        || (!executing && (destination.energy < 1))
    ) {
        delete this.memory.destination;
        console.log(this.name + " is finding a new destination...");
        // New destination is needed
        let newDestination = this.findClosestDestination(destinationType);
        if(!newDestination) {
            return false;
        }
        console.log("Found new destination: " + JSON.stringify(newDestination));
        this.setDestination(newDestination, destinationType);
    }

    return true;
};


Creep.prototype.roleHarvester = function () {
    if (!this.roleHarvesterDestination()) {
        // Fallback role
        this.roleBuilder();
        return;
    }
    
    if(this.actOnTarget() != OK) {
        this.moveToTarget();
    }
};