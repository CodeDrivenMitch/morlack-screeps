let _ = require('lodash');

Structure.prototype.hasAvailableEnergy = function() {
    let capacityUnderway = 0;
    let self = this;

    _.each(Game.creeps, function(creep) {
        let destination = creep.getDestination();
        if (!!destination && (destination.id === self.id)) {
            capacityUnderway += (creep.carryCapacity - creep.carry.energy)
        }

    });

    return capacityUnderway < this.store.energy;
};