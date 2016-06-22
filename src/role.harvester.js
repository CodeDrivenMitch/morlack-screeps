var roleBuilder = require('./role.builder');

Creep.prototype.roleHarvester = function () {
    if (this.shouldExecute()) {
        if (this.hasDestination() && _.isEqual(this.getDestinationType().valueOf(), "harvester".valueOf())) {
            if (this.shouldMove(1)) {
                this.moveToTarget();
            } else {
                let destination = this.getDestination();
                if (destination.energy >= destination.energyCapacity || this.transfer(destination, RESOURCE_ENERGY) !== OK) {
                    console.log(this.name + " resetting");
                    this.resetDestination();
                    this.roleHarvester();
                }
            }
        } else {
            // Create new destination
            let newDestination = this.findClosestDestination("harvester");
            if (!!newDestination) {
                this.setDestination(newDestination, 'harvester');
                this.roleHarvester();
            } else {
                this.roleBuilder();
            }
        }
    }
    else {
        if (this.hasDestination() && _.isEqual(this.getDestinationType().valueOf(), "source".valueOf())) {
            let source = this.getDestination();

            if (source.energy < 1) {
                this.resetDestination();
                this.roleHarvester();
                return;
            }

            if (this.shouldMove(1)) {
                this.moveToTarget()
            } else {
                this.harvest(source);
            }
        } else {
            this.setDestination(this.findClosestSource(), 'source');
            this.roleHarvester();
        }
    }
};