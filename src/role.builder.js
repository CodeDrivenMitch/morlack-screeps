Creep.prototype.roleBuilderDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "builder_build" : "builder_source";

    if ((destination === false || destination === null)
        || (this.isDestinationType(destinationType) === false)
        || (!executing && (destination.energy < 1))
    ) {
        // New destination is needed
        let newDestination = this.findClosestDestination(destinationType);
        if (!newDestination) {
            return false;
        }
        this.setDestination(newDestination, destinationType);
    }

    return true;
};


Creep.prototype.roleBuilder = function () {
    if (!this.roleBuilderDestination()) {
        return;
    }

    if (this.actOnTarget() != OK) {
        this.moveToTarget();
    }
};