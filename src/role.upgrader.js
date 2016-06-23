Creep.prototype.roleUpgraderDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "upgrader" : "container";

    if(destination === false
        || !this.isDestinationType(destinationType)
        || (!executing && _.sum(destination.store) === 0))
    {
        // New destination is needed
        let newDestination = executing ? this.room.controller : this.findClosestFilledContainer();
        if(!newDestination) {
            return false;
        }
        this.setDestination(newDestination, destinationType);
    }

    return true;
};


Creep.prototype.roleUpgrader = function () {
    if (!this.roleUpgraderDestination()) {
        // Fallback role
        this.roleHarvester();
        return;
    }

    let destination = this.getDestination();
    let result = this.shouldExecute() ? this.upgradeController(this.room.controller) : destination.transfer(this, RESOURCE_ENERGY);


    if(result != OK) {
        this.moveToTarget();
    }
};