Creep.prototype.roleHarvesterDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "harvester" : "source";

    if(    (destination === false)
        || (this.isDestinationType(destinationType) === false)
        || (executing && (destination.structureType === STRUCTURE_CONTAINER || destination.structureType === STRUCTURE_STORAGE) && (_.sum(destination.store) > (destination.storeCapacity - this.carryCapacity)))
        || (executing && (destination.structureType === STRUCTURE_SPAWN || destination.structureType === STRUCTURE_EXTENSION) && (destination.energy > (destination.energyCapacity - this.carryCapacity)))
        || (!executing && (destination.energy < 1))
    ) {
        console.log(this.name + " is finding a new destination...");
        // New destination is needed
        let newDestination = executing ? this.findClosestDestination("harvester") : this.findClosestSource();
        if(!newDestination) {
            return false;
        }
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

    let destination = this.getDestination();
    let result = this.shouldExecute() ? this.transfer(destination, RESOURCE_ENERGY) : this.harvest(destination);

    
    if(result != OK) {
        this.moveToTarget();
    }
};