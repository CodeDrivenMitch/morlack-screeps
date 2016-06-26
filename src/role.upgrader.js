let C = require('./constants');

Creep.prototype.roleUpgraderDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? C.TARGET_UPGRADER_UPGRADE : C.TARGET_UPGRADER_SOURCE;

    if (destination === false
        || !this.isDestinationType(destinationType)
        || (!executing && _.sum(destination.store) === 0)) {
        // New destination is needed
        let newDestination = this.findClosestDestination(destinationType);
        if (!newDestination) {
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

    if (this.actOnTarget() != OK) {
        this.moveToTarget();
    }
};