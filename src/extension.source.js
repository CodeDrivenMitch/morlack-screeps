let _ = require('lodash');

Source.prototype.isAvailable = function() {
    let maxAmountOfWorkParts = this.energyCapacity / 300 / 2 + 1;

    let currentParts = 0;
    let self = this;

    _.each(Game.creeps, function(creep) {
        let destination = creep.getDestination();
        if (!!destination &&destination.id === self.id) {
            _.each(creep.body, function(bodyPart) {
                if(bodyPart.type === MOVE) {
                    currentParts++;
                }
            })
        }

    });

    return currentParts < maxAmountOfWorkParts;
};