Creep.prototype.roleSupplierDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? "put" : "get";

    if(     (destination === false)
        ||  (!this.isDestinationType(destinationType))
        ||  (executing  && (destination.energy >= destination.energyCapacity))
        ||  (!executing && (destination.store.energy > 0))
    )
    {
        // New destination is needed
        let newDestination = executing ? this.findClosestDestination("supplier") : this.findClosestFilledContainer();
        if(!newDestination) {
            return false;
        }
        this.setDestination(newDestination, destinationType);
    }

    return true;
};


Creep.prototype.roleSupplier = function () {
    if (!this.roleSupplierDestination()) {
        // Fallback role
        this.roleUpgrader();
        return;
    }

    let destination = this.getDestination();
    let result = this.shouldExecute() ? this.transfer(destination, RESOURCE_ENERGY) : destination.transfer(this, RESOURCE_ENERGY);


    if(result != OK) {
        this.moveToTarget();
    }
};