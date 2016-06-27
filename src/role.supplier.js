let C = require('./constants');

Creep.prototype.roleSupplierDestination = function () {
    let executing = this.shouldExecute();
    let destination = this.getDestination();
    let destinationType = executing ? C.TARGET_SUPPLIER_PUT : C.TARGET_SUPPLIER_GET;

    if(     (!destination)
        ||  (!this.isDestinationType(destinationType))
        ||  (executing  && (destination.energy >= destination.energyCapacity))
        ||  (!executing && (!!destination.store && destination.store.energy > 0))
        ||  (!executing && (!destination.store && destination.energy > 0))
    )
    {
        // New destination is needed
        let newDestination = this.findClosestDestination(destinationType);
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
        return;
    }

    let result = this.actOnTarget();


    if(result != OK) {
        this.moveToTarget();
    }
};