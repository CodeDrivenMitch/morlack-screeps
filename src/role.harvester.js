let _ = require('lodash');

Creep.prototype.roleHarvesterDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "harvester" : "source";

    if(destination === false
        || !this.isDestinationType(destinationType)
        || executing && destination.energy >= destination.energyCapacity
        || !executing && destination.energy < 1)
    {
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