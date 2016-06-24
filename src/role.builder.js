Creep.prototype.roleBuilderDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "builder" : "source";

    if(    (destination === false || destination === null)
        || (this.isDestinationType(destinationType) === false)
        || (!executing && (destination.energy < 1))
    ) {
        console.log(this.name + " is finding a new destination...");
        // New destination is needed
        let newDestination = executing ? this.findClosestDestination("builder") : this.findClosestSource();
        if(!newDestination) {
            return false;
        }
        this.setDestination(newDestination, destinationType);
    }

    return true;
};


Creep.prototype.roleBuilder = function () {
    if (!this.roleBuilderDestination()) {
        // Fallback role
        this.roleSupplier();
        return;
    }

    let destination = this.getDestination();
    let result = this.shouldExecute() ? this.build(destination) : this.harvest(destination);


    if(result != OK) {
        this.moveToTarget();
    }
};